# Change Log

All notable changes to the "dracula-colorful" extension will be documented in this file.

## [2.2.0] - 2026-09-23

### Changed

- The side bar now shares the editor's background, so the Explorer, Search, Source Control, and Chat views feel like one continuous surface with your code
- In VS Code's new floating-panel UI preview, the side bar and activity bar form a single card that matches the editor, framed by a softer outline against the darker window background

## [2.1.1] - 2026-08-03

### Fixed

- Text inside tags no longer inherits the tag's pink color in JSX and TSX files — plain text content now uses the normal foreground color

## [2.1.0] - 2026-08-03

### Changed

- Refreshed workbench contrast: the side bar, bottom panel, terminal, and window chrome now use a darker shade that frames the editor, so panels stay clearly separated — including in VS Code's new floating-panel UI preview
- Editor tabs redesigned: a darker tab strip, dimmed inactive tab labels, and an active tab that blends into the editor with a pink top indicator; hovering an inactive tab previews its active look
- The active view icon in the activity bar now gets a purple highlight
- Count badges (search results, source control, notifications) are now green for quicker recognition
- Context menus and the command palette are slightly darker, with a lighter input field that stands out
- Scrollbars carry a soft purple tint that turns solid purple on hover and while dragging
- Error, warning, and info underlines use more distinct colors — crimson, orange, and cyan — so severities are easier to tell apart at a glance
- Find matches highlight in green, with other occurrences in purple; the word under the cursor gets a solid purple highlight
- Calmer version-control marks in the gutter with softer green and blue tones
- Folded code regions now show a subtle shaded background

## [2.0.0] - 2026-05-27

### Changed

- Unified, calmer workbench: activity bar, side bar, title bar, status bar, and breadcrumb now share the editor's background for a seamless look
- Clearer list and menu selections: active rows stand out from hovered rows in the Explorer, Search results, command palette, and autocomplete
- More distinctive buttons: primary buttons get a soft purple outline so the default action is easier to spot; secondary buttons read as quieter
- Active editor tab now sports a subtle purple indicator on top, making the focused file easier to find at a glance
- Search matches highlight in pink for stronger visibility against the editor background
- Friendlier panel headers and section dividers with consistent contrast across the UI

### Added

- Distinct colors for ignored files, merge conflicts, and staged changes in the Source Control view
- Hover feedback for status bar items
- Colored borders on validation messages (error, warning, info) for quicker recognition

## [1.1.3] - 2026-03-01

### Fixed

- Cursor color: use on-palette foreground white (`#f8f8f2`) instead of off-palette gray
- Modified file gutter and overview ruler: use Dracula orange (`#ffb86c`) instead of off-palette teal
- Untracked git files: use green (`#50fa7b`) instead of red to distinguish from deleted files
- Bracket color hex values: strip redundant full-opacity alpha suffix for consistency

## [1.1.2] - 2026-02-16

### Changed

- Use brighter Dracula purple for selection highlight, word highlight, and word highlight strong backgrounds to improve visibility

## [1.1.1] - 2026-02-09

### Changed

- Refine list and menu highlight colors using Dracula accent purple with alpha transparency for clearer selection visibility
- Add selection colors for command palette, context menus, and autocomplete widget

## [1.1.0] - 2026-02-08

### Changed

- Update link highlight and hover colors to Dracula accent pink/purple
- Set extension verified icon color to Dracula accent purple
- Refine bracket pair colors for braces, brackets, and parentheses
- Adjust scrollbar and button hover colors to Dracula accent purple

## [1.0.1] - 2026-02-06

### Fixed

- Hide scrollbar border by matching editor background color
- Update diff editor colors to use proper Dracula palette (green for insertions, red for deletions)
- Fix git deleted resource foreground to use Dracula red instead of gray

## [1.0.0] - 2026-01-26

### Added

- Initial release of Dracula Colorful theme
