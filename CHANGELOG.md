# Changelog

All notable changes will be documented in this file.

## [1.1.0] - 2026-04-28

### Added
- 🌙 **Dark Mode** — Toggle between light and dark themes, auto-detects system preference
- 📊 **XML ↔ JSON/CSV** — Full XML parsing and conversion support
- 📊 **YAML ↔ JSON/CSV** — YAML parsing and conversion support
- 📊 **TSV ↔ JSON/CSV** — TSV (Tab-Separated Values) support
- 📦 **Batch ZIP Download** — Convert multiple files and download as a single ZIP archive
- 📱 **Responsive UI** — Better mobile experience
- 📋 **Format Auto-Detection** — Automatically detects CSV, JSON, XML, YAML formats when pasting text

### Fixed
- Batch file input (Vue 3 `$refs` issue)
- CSV parsing with quoted fields
- Output filename extension handling

### Changed
- Simplified codebase, removed Pro license modal
- Improved error handling
- Better file size formatting

## [1.0.0] - 2026-04-26

### Added
- CSV ↔ JSON conversion
- Excel (.xlsx/.xls) ↔ JSON
- CSV ↔ Excel
- Base64, URL Encode/Decode text tools
- Batch file conversion
- Drag and drop file upload
- Copy and download output
- GitHub Pages deployment
- GitHub Actions CI/CD
