// English translations
export default {
  // General
  app: {
    title: 'convertTools',
    pro: 'PRO',
  },

  // Header
  header: {
    github: 'GitHub',
    support: 'Support ❤️',
    history: '📋 History',
  },

  // Hero Section
  hero: {
    title: 'All-in-One File Format Converter',
    subtitle: 'Convert CSV, Excel, JSON, XML in seconds. No installation. Free.',
    badge: '🎉 100% Free & Open Source',
    supportLink: 'Support ❤️',
  },

  // Format Selector
  formats: {
    csvJson: 'CSV ↔ JSON',
    excelJson: 'Excel ↔ JSON',
    csvExcel: 'CSV ↔ Excel',
    jsonXml: 'JSON ↔ XML',
    text: 'Text Tools',
    batch: '📁 Batch Convert',
  },

  // Input Mode
  inputMode: {
    file: '📁 Upload File',
    text: '⌨️ Paste Text',
  },

  // File Upload
  upload: {
    dropText: 'Drop your file here or click to browse',
    supportedFiles: 'Supported file types',
    proLabel: '(Pro)',
    batchSubtitle: 'Convert multiple files at once with same output format',
    selectFiles: '📂 Select Multiple Files',
    filesSelected: 'files selected:',
    outputFormat: 'Output:',
    clearAll: 'Clear all',
  },

  // Size Warning
  sizeWarning: {
    free: 'File size exceeds {limit} limit. Upgrade to Pro for files up to {proLimit}.',
  },

  // Convert Button
  convert: {
    converting: '⚡ Converting...',
    button: '🔄 Convert to {format}',
  },

  // Progress
  progress: {
    converting: 'Converting...',
  },

  // Messages
  messages: {
    success: '✅ {count} files converted!',
    converted: '✅ Conversion completed successfully!',
    downloaded: '✅ Excel file downloaded successfully!',
    zipDownloaded: '✅ ZIP file downloaded successfully!',
    loaded: '✅ Loaded from history',
    copied: '✅ Copied!',
  },

  // Output
  output: {
    title: 'Output ({format})',
    copy: '📋 Copy',
    download: '⬇️ Download',
  },

  // Batch Output
  batchOutput: {
    downloadAll: '⬇️ Download All (ZIP)',
  },

  // History
  history: {
    title: 'Recent Conversions',
    clear: 'Clear',
    empty: 'No history yet',
    textInput: 'Text input',
    confirmClear: 'Clear all history?',
  },

  // Upgrade Modal
  upgrade: {
    title: 'Support convertTools',
    subtitle: 'This tool is 100% free & open source',
    ifHelpful: 'If this tool saved you time 💪',
    buyCoffee: '☕ Buy me a coffee',
    starGithub: '⭐ Star on GitHub',
    shareFriends: '🔗 Share with friends',
    buyCoffeeBtn: '☕ Buy Me a Coffee',
    starGithubBtn: '⭐ Star on GitHub',
    orEnterCode: 'or enter sponsor code',
    licenseKey: 'License Key',
    placeholder: 'CH-PRO-XXXX-XXXX-XXXX',
    activate: 'Activate',
    cancel: 'Cancel',
    close: 'Close',
    removeLicense: 'Remove License',
    confirmRemove: 'Remove Pro license from this browser?',
    proActivated: '✅ Pro Activated',
    storedLocally: 'License stored locally in your browser',
    proBenefits: 'Enjoy larger file sizes and batch processing.',
  },

  // Activation Messages
  activation: {
    success: 'Pro activated successfully! Enjoy larger file sizes and batch processing.',
    invalidFormat: 'Invalid license key format. Expected: CH-PRO-XXXX-XXXX-XXXX',
  },

  // Errors
  errors: {
    conversionFailed: 'Conversion failed. Please check your input format.',
    batchFailed: 'Batch conversion failed. Please check your files.',
    sizeExceeded: 'File size exceeds {limit} limit. Upgrade to Pro for larger files.',
    invalidCsv: 'Invalid CSV format. Need at least header and one data row.',
    invalidExcel: 'Failed to parse Excel file',
    invalidXml: 'Invalid XML format',
    invalidBase64: 'Invalid Base64 string',
    invalidUrl: 'Invalid URL encoded string',
    readFailed: 'Failed to read file',
    zipFailed: 'Failed to create ZIP file: ',
    unsupportedFormat: 'Unsupported output format: {format}',
  },

  // Features
  features: {
    fast: {
      title: 'Lightning Fast',
      desc: 'Convert files instantly in your browser. No server upload needed.',
    },
    private: {
      title: '100% Private',
      desc: 'Your files never leave your device. Everything runs locally.',
    },
    free: {
      title: '100% Free',
      desc: 'No limits, no signup, no ads. Open source forever.',
    },
  },

  // Footer
  footer: {
    builtBy: 'Built with ❤️ by',
    poweredBy: '· Powered by Vue3',
  },

  // Text Tools
  textTools: {
    base64Encode: 'Base64 Encode',
    base64Decode: 'Base64 Decode',
    urlEncode: 'URL Encode',
    urlDecode: 'URL Decode',
    plainText: 'Plain Text',
    placeholder: 'Enter your text here...',
    pastePlaceholder: 'Paste your {format} content here...',
  },

  // Time Formatting
  time: {
    justNow: 'Just now',
    minutesAgo: '{m}m ago',
    hoursAgo: '{h}h ago',
  },

  // Pricing
  pricing: {
    freeTier: 'Free Tier',
    proTier: 'Pro Tier',
    freeFeatures: [
      '✅ All format conversions',
      '✅ Text tools',
      '✅ Up to 5MB file size',
      '✅ Conversion history',
      '✅ No ads, no signup',
    ],
    proFeatures: [
      '🚀 Up to 50MB file size (10x increase)',
      '📦 Batch file conversion',
      '🗜️ ZIP download',
      '⭐ Priority support',
      '❤️ Support open source development',
    ],
    freeLimit: 'Free',
    proLimit: 'Pro',
  },

  // UI Labels
  ui: {
    copied: '✅ Copied!',
    copy: '📋 Copy',
    downloadAllZip: '⬇️ Download All (ZIP)',
    dropFileText: 'Drop your file here or click to browse',
    pasteTextPlaceholder: 'Paste your {format} content here...',
    enterTextPlaceholder: 'Enter your text here...',
    converting: '⚡ Converting...',
    convertTo: '🔄 Convert to {format}',
    outputTitle: 'Output ({format})',
    recentConversions: 'Recent Conversions',
    clearHistory: 'Clear',
    noHistory: 'No history yet',
    textInput: 'Text input',
    filesSelected: 'files selected:',
    outputFormat: 'Output:',
    clearAll: 'Clear all',
    uploadFile: '📁 Upload File',
    pasteText: '⌨️ Paste Text',
    batchConvertPro: 'Batch Convert (Pro)',
    selectMultipleFiles: '📂 Select Multiple Files',
    lightningFast: 'Lightning Fast',
    fastDesc: 'Convert files instantly in your browser. No server upload needed.',
    private: '100% Private',
    privateDesc: 'Your files never leave your device. Everything runs locally.',
    freeForever: '100% Free',
    freeDesc: 'No limits, no signup, no ads. Open source forever.',
    builtBy: 'Built with ❤️ by',
    poweredBy: '· Powered by Vue3',
    close: 'Close',
    cancel: 'Cancel',
    removeLicense: 'Remove License',
    confirmRemove: 'Remove Pro license from current browser?',
  },
}
