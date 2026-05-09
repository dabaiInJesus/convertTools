import zhCN from './zh-CN'
import enUS from './en-US'

export type Locale = 'zh-CN' | 'en-US'

const messages: Record<Locale, any> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

// 当前语言
let currentLocale: Locale = 'zh-CN'

// 获取翻译
export function t(key: string, params?: Record<string, any>): string {
  const keys = key.split('.')
  let value: any = messages[currentLocale]
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
  }
  
  if (typeof value === 'string' && params) {
    // 替换参数
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey] || `{${paramKey}}`
    })
  }
  
  return value || key
}

// 设置语言
export function setLocale(locale: Locale) {
  if (messages[locale]) {
    currentLocale = locale
    localStorage.setItem('convertTools_locale', locale)
    // 触发语言变更事件
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale } }))
  }
}

// 获取当前语言
export function getLocale(): Locale {
  return currentLocale
}

// 初始化语言（从 localStorage 或默认中文）
export function initLocale(): Locale {
  const stored = localStorage.getItem('convertTools_locale') as Locale
  if (stored && messages[stored]) {
    currentLocale = stored
    return stored
  }
  
  // 默认使用中文
  currentLocale = 'zh-CN'
  
  return currentLocale
}

// 获取所有支持的语言
export function getSupportedLocales(): { code: Locale; name: string }[] {
  return [
    { code: 'zh-CN', name: '中文' },
    { code: 'en-US', name: 'English' },
  ]
}

// 导出消息对象（供 Vue 组件使用）
export function getMessages() {
  return messages[currentLocale]
}
