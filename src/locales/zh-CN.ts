// 中文翻译
export default {
  // 通用
  app: {
    title: 'convertTools',
    pro: '专业版',
  },

  // Header
  header: {
    github: 'GitHub',
    support: '支持 ❤️',
    history: '📋 历史',
  },

  // Hero Section
  hero: {
    title: '全能文件格式转换工具',
    subtitle: '秒级转换 CSV、Excel、JSON、XML。无需安装，完全免费。',
    badge: '🎉 100% 免费且开源',
    supportLink: '支持 ❤️',
  },

  // Format Selector
  formats: {
    csvJson: 'CSV ↔ JSON',
    excelJson: 'Excel ↔ JSON',
    csvExcel: 'CSV ↔ Excel',
    jsonXml: 'JSON ↔ XML',
    text: '文本工具',
    batch: '📁 批量转换',
  },

  // Input Mode
  inputMode: {
    file: '📁 上传文件',
    text: '⌨️ 粘贴文本',
  },

  // File Upload
  upload: {
    dropText: '拖拽文件到此处或点击浏览',
    supportedFiles: '支持的文件格式',
    proLabel: '（专业版）',
    batchSubtitle: '一次性转换多个文件为相同输出格式',
    selectFiles: '📂 选择多个文件',
    filesSelected: '个文件已选择：',
    outputFormat: '输出格式：',
    clearAll: '清除全部',
  },

  // Size Warning
  sizeWarning: {
    free: '文件大小超过 {limit} 限制。升级专业版可处理高达 {proLimit} 的文件。',
  },

  // Convert Button
  convert: {
    converting: '⚡ 转换中...',
    button: '🔄 转换为 {format}',
  },

  // Progress
  progress: {
    converting: '转换中...',
  },

  // Messages
  messages: {
    success: '✅ {count} 个文件转换成功！',
    converted: '✅ 转换成功完成！',
    downloaded: '✅ Excel 文件下载成功！',
    zipDownloaded: '✅ ZIP 文件下载成功！',
    loaded: '✅ 已从历史记录加载',
    copied: '✅ 已复制！',
  },

  // Output
  output: {
    title: '输出结果 ({format})',
    copy: '📋 复制',
    download: '⬇️ 下载',
  },

  // Batch Output
  batchOutput: {
    downloadAll: '⬇️ 下载全部 (ZIP)',
  },

  // History
  history: {
    title: '最近转换',
    clear: '清除',
    empty: '暂无历史记录',
    textInput: '文本输入',
    confirmClear: '清除所有历史记录？',
  },

  // Upgrade Modal
  upgrade: {
    title: '支持 convertTools',
    subtitle: '本工具 100% 免费且开源',
    ifHelpful: '如果这个工具帮到了你 💪',
    buyCoffee: '☕ 请我喝杯咖啡',
    starGithub: '⭐ 在 GitHub 上 Star',
    shareFriends: '🔗 分享给朋友',
    buyCoffeeBtn: '☕ 请我喝杯咖啡',
    starGithubBtn: '⭐ 在 GitHub 上 Star',
    orEnterCode: '或输入赞助码',
    licenseKey: '许可证密钥',
    placeholder: 'CH-PRO-XXXX-XXXX-XXXX',
    activate: '激活',
    cancel: '取消',
    close: '关闭',
    removeLicense: '移除许可证',
    confirmRemove: '从当前浏览器移除专业版许可证？',
    proActivated: '✅ 专业版已激活',
    storedLocally: '许可证存储在本地浏览器中',
    proBenefits: '享受更大文件和批量处理功能。',
  },

  // Activation Messages
  activation: {
    success: '专业版激活成功！享受更大文件和批量处理功能。',
    invalidFormat: '许可证密钥格式无效。期望格式：CH-PRO-XXXX-XXXX-XXXX',
  },

  // Errors
  errors: {
    conversionFailed: '转换失败。请检查输入格式。',
    batchFailed: '批量转换失败。请检查文件。',
    sizeExceeded: '文件大小超过 {limit} 限制。升级专业版可处理更大文件。',
    invalidCsv: 'CSV 格式无效。至少需要表头和一行数据。',
    invalidExcel: 'Excel 文件解析失败',
    invalidXml: 'XML 格式无效',
    invalidBase64: 'Base64 字符串无效',
    invalidUrl: 'URL 编码字符串无效',
    readFailed: '文件读取失败',
    zipFailed: 'ZIP 文件创建失败：',
    unsupportedFormat: '不支持的输出格式：{format}',
  },

  // Features
  features: {
    fast: {
      title: '闪电般快速',
      desc: '在浏览器中即时转换文件。无需服务器上传。',
    },
    private: {
      title: '100% 隐私保护',
      desc: '您的文件永远不会离开设备。所有操作都在本地运行。',
    },
    free: {
      title: '100% 免费',
      desc: '无限制、无需注册、无广告。永远开源。',
    },
  },

  // Footer
  footer: {
    builtBy: '由',
    poweredBy: '驱动 · 基于 Vue3',
  },

  // Text Tools
  textTools: {
    base64Encode: 'Base64 编码',
    base64Decode: 'Base64 解码',
    urlEncode: 'URL 编码',
    urlDecode: 'URL 解码',
    plainText: '纯文本',
    placeholder: '在此输入文本...',
  },

  // Time Formatting
  time: {
    justNow: '刚刚',
    minutesAgo: '{m}分钟前',
    hoursAgo: '{h}小时前',
  },

  // Pricing
  pricing: {
    freeTier: '免费版',
    proTier: '专业版',
    freeFeatures: [
      '✅ 所有格式转换',
      '✅ 文本工具',
      '✅ 最多 5MB 文件',
      '✅ 转换历史',
      '✅ 无广告、无需注册',
    ],
    proFeatures: [
      '🚀 最多 50MB 文件（提升 10 倍）',
      '📦 批量文件转换',
      '🗜️ ZIP 打包下载',
      '⭐ 优先支持',
      '❤️ 支持开源开发',
    ],
    freeLimit: '免费版',
    proLimit: '专业版',
  },
}
