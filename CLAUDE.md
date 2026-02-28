# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VS Code color theme extension — **Dracula Colorful** — a variant of the Dracula theme with bold accents, colorful brackets, and semantic highlighting enabled by default. The extension is published to both the VS Code Marketplace (`nszihan.vscode-dracula-colorful`) and the Open VSX Registry.

## Commands

The package manager is **pnpm**.

```sh
pnpm install           # Install dependencies
pnpm validate:theme    # Validate the theme JSON (run before packaging)
pnpm package           # Validate + package into a .vsix file
```

Publishing (requires `VSCE_PAT` / `OVSX_PAT` secrets):

```sh
pnpm publish:patch     # Bump patch, publish to both marketplaces
pnpm publish:minor     # Bump minor, publish to both marketplaces
pnpm publish:major     # Bump major, publish to both marketplaces
```

## Architecture

The entire theme lives in a single file:

- **`themes/Dracula Colorful-color-theme.json`** — the VS Code color theme. Contains two top-level sections:
  - `colors` — workbench/UI color tokens (editor, sidebar, tabs, status bar, etc.)
  - `tokenColors` — TextMate grammar rules for syntax highlighting

- **`scripts/validate-theme.mjs`** — pre-package validation script. Uses `jsonc-parser` to parse the theme JSON and enforces:
  - No duplicate keys in `colors`
  - All color keys match the pattern `[a-z][A-Za-z0-9]*(\.[A-Za-z0-9]+)*`
  - All color values are valid hex (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`), CSS color functions (`rgb()`, `rgba()`, `hsl()`, `hsla()`), or `"transparent"`

CI runs `pnpm validate:theme` on every push/PR to `main` and on all version tags. Publishing to marketplaces is triggered automatically on `v*` tags.

## Dracula Palette Reference

Core colors used throughout the theme:

| Role | Hex |
|---|---|
| Background | `#282a36` |
| Current line | `#44475a` |
| Comment / subtle | `#6272a4` |
| Foreground | `#f8f8f2` |
| Cyan | `#8be9fd` |
| Green | `#50fa7b` |
| Orange | `#ffb86c` |
| Pink (accent) | `#ff79c6` |
| Purple (accent) | `#bd93f9` |
| Red | `#ff5555` |
| Yellow | `#f1fa8c` |

## Release Workflow

1. Edit `themes/Dracula Colorful-color-theme.json` with the color changes.
2. Update `CHANGELOG.md` with a new version entry.
3. Bump `version` in `package.json`.
4. Commit and push; tag the commit `v<version>` to trigger CI publishing.
