#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { parseTree, getNodeValue, printParseErrorCode } from 'jsonc-parser';

const THEME_PATH = path.resolve('themes/Dracula Colorful-color-theme.json');

const COLOR_KEY_PATTERN = /^[a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const CSS_FN_COLOR_PATTERN = /^(?:rgb|rgba|hsl|hsla)\([^\n\r]+\)$/i;

function fail(message) {
  console.error(`\nTheme validation failed:\n- ${message}`);
  process.exit(1);
}

function getLineAndColumn(text, offset) {
  let line = 1;
  let column = 1;

  for (let i = 0; i < offset; i += 1) {
    if (text.charCodeAt(i) === 10) {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }

  return { line, column };
}

function formatLocation(text, offset) {
  const { line, column } = getLineAndColumn(text, offset);
  return `${line}:${column}`;
}

function getObjectPropertyMap(objectNode) {
  const seen = new Map();
  const duplicates = [];

  for (const propertyNode of objectNode.children ?? []) {
    const keyNode = propertyNode.children?.[0];
    if (!keyNode) {
      continue;
    }

    const key = getNodeValue(keyNode);
    const existing = seen.get(key);

    if (existing) {
      duplicates.push({
        key,
        firstOffset: existing.keyNode.offset,
        duplicateOffset: keyNode.offset,
      });
      continue;
    }

    seen.set(key, {
      keyNode,
      valueNode: propertyNode.children?.[1],
    });
  }

  return { seen, duplicates };
}

function isValidThemeColorValue(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();

  return (
    trimmed === 'transparent' ||
    HEX_COLOR_PATTERN.test(trimmed) ||
    CSS_FN_COLOR_PATTERN.test(trimmed)
  );
}

const raw = fs.readFileSync(THEME_PATH, 'utf8');
const parseErrors = [];
const root = parseTree(raw, parseErrors, {
  allowEmptyContent: false,
  disallowComments: true,
  allowTrailingComma: false,
});

if (parseErrors.length > 0 || !root) {
  const details = parseErrors
    .map((error) => `${printParseErrorCode(error.error)} at ${formatLocation(raw, error.offset)}`)
    .join(', ');
  fail(`Invalid JSON in ${THEME_PATH} (${details}).`);
}

if (root.type !== 'object') {
  fail(`${THEME_PATH} root must be a JSON object.`);
}

const rootProperties = getObjectPropertyMap(root);
if (rootProperties.duplicates.length > 0) {
  const issue = rootProperties.duplicates[0];
  fail(
    `Duplicate top-level key "${issue.key}" at ${formatLocation(raw, issue.duplicateOffset)} (first defined at ${formatLocation(raw, issue.firstOffset)}).`
  );
}

const colorsProperty = (root.children ?? []).find((propertyNode) => {
  const keyNode = propertyNode.children?.[0];
  return keyNode && getNodeValue(keyNode) === 'colors';
});

if (!colorsProperty) {
  fail('Missing required "colors" object.');
}

const colorsValueNode = colorsProperty.children?.[1];
if (!colorsValueNode || colorsValueNode.type !== 'object') {
  fail('"colors" must be a JSON object.');
}

const colorEntries = getObjectPropertyMap(colorsValueNode);
if (colorEntries.duplicates.length > 0) {
  const issue = colorEntries.duplicates[0];
  fail(
    `Duplicate color key "${issue.key}" at ${formatLocation(raw, issue.duplicateOffset)} (first defined at ${formatLocation(raw, issue.firstOffset)}).`
  );
}

const invalidColorKeys = [];
const invalidColorValues = [];

for (const [key, nodes] of colorEntries.seen.entries()) {
  const { keyNode, valueNode } = nodes;
  const value = valueNode ? getNodeValue(valueNode) : undefined;

  if (!COLOR_KEY_PATTERN.test(key)) {
    invalidColorKeys.push({ key, offset: keyNode.offset });
  }

  if (!isValidThemeColorValue(value)) {
    invalidColorValues.push({ key, offset: valueNode?.offset ?? keyNode.offset, value });
  }
}

if (invalidColorKeys.length > 0) {
  const issue = invalidColorKeys[0];
  fail(
    `Invalid color key "${issue.key}" at ${formatLocation(raw, issue.offset)}. Use dot-separated alphanumeric segments (example: editor.background).`
  );
}

if (invalidColorValues.length > 0) {
  const issue = invalidColorValues[0];
  fail(
    `Invalid color value for key "${issue.key}" at ${formatLocation(raw, issue.offset)} (${JSON.stringify(issue.value)}). Use hex (#RGB/#RGBA/#RRGGBB/#RRGGBBAA), rgb()/rgba()/hsl()/hsla(), or "transparent".`
  );
}

console.log(`Theme validation passed: ${THEME_PATH}`);
