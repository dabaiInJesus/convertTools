# Changelog

All notable changes to convertTools will be documented in this file.

## [2.0.0] - 2026-05-09

### 🎉 Major Update - Complete Feature Overhaul

#### ✨ New Features
- **JSON ↔ XML Conversion**: Added support for converting between JSON and XML formats
- **Batch ZIP Download**: Implemented JSZip integration for downloading all converted files as a single ZIP archive
- **Conversion History**: Added history sidebar to track recent conversions with quick reload capability
- **Progress Indicator**: Visual progress bar showing conversion status
- **Enhanced Text Tools**: 
  - Base64 Encode/Decode
  - URL Encode/Decode
  - Plain text processing
- **Smart CSV Parser**: Improved CSV parsing with proper quote handling and escaping

#### 🔧 Improvements
- **Excel File Handling**: Enhanced Excel file reading with proper sheet-to-JSON conversion
- **File Size Limits**: 
  - Free tier: 5MB limit
  - Pro tier: 50MB limit
- **Better Error Handling**: More descriptive error messages and validation
- **Responsive Design**: Optimized layout for mobile devices
- **Pro Badge Display**: Visual indicator for activated Pro licenses
- **Success Messages**: Clear feedback after successful conversions

#### 🐛 Bug Fixes
- Fixed Excel file parsing issues
- Improved CSV line parsing with proper quote support
- Fixed text tool format selection
- Corrected output format display (toUpperCase function call)

#### 📦 Dependencies
- Added `jszip@^3.10.1` for ZIP file creation
- Updated project structure for better maintainability

#### 📝 Documentation
- Updated README with new features
- Added detailed pricing tiers
- Improved project structure documentation
- Created CHANGELOG for version tracking

#### 🎯 Performance
- Code splitting optimization for faster loading
- Better chunk management with Vite configuration
- Reduced bundle size through tree shaking

---

## [1.0.0] - Initial Release

### Features
- CSV ↔ JSON conversion
- Excel ↔ JSON conversion  
- CSV ↔ Excel conversion
- Basic text tools
- Batch file conversion
- Browser-based processing
- GitHub Pages deployment
