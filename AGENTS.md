# Repository Guidelines

## Project Structure & Module Organization
This repository is a single VS Code theme extension.

- `themes/Dracula Colorful-color-theme.json`: source of truth for UI and syntax colors.
- `scripts/validate-theme.mjs`: validation script for theme JSON structure and color values.
- `.github/workflows/build.yml`: CI for validation, packaging, and tag-based publishing.
- `package.json`: extension metadata and release scripts.
- `CHANGELOG.md`, `README.md`, `icon.png`, `screenshot.png`: release notes and marketplace assets.

## Build, Test, and Development Commands
Use `pnpm` and Node.js 20 (matches CI).

- `pnpm install`: install dependencies.
- `pnpm validate:theme`: validate theme JSON (required before PRs/releases).
- `pnpm package`: run validation, then build a `.vsix` with `vsce`.
- `pnpm publish:patch` / `pnpm publish:minor` / `pnpm publish:major`: version bump and publish to VS Code Marketplace + Open VSX.

Example local verification:
```sh
pnpm install
pnpm validate:theme
pnpm package
```

## Coding Style & Naming Conventions
- JavaScript (`scripts/*.mjs`): ES modules, 2-space indentation, semicolons, single quotes.
- Theme file: strict JSON only (no comments, no trailing commas).
- Color keys in `colors` should follow dot notation (e.g., `editor.background`).
- Color values must be valid hex/CSS color function formats or `"transparent"` (enforced by validator).
- Keep related theme tokens grouped logically (editor, sidebar, list, terminal, etc.) for easier reviews.

## Testing Guidelines
- There is no unit test suite; `pnpm validate:theme` is the required quality gate.
- Run validation after every theme edit and before opening a PR.
- For visual changes, manually verify in VS Code and include updated screenshots when changes are user-visible.

## Commit & Pull Request Guidelines
- Follow existing history style: short, imperative commit subjects (e.g., `Update editor highlight colors...`, `Bump version to 1.1.2...`).
- Keep commits focused by concern (theme tweak, docs update, release bump).
- PRs should include:
  - a concise description of changed scopes/tokens,
  - linked issue(s) when applicable,
  - before/after screenshot(s) for visible color changes,
  - `CHANGELOG.md` updates for release-facing changes.
