# convertTools 多语言功能说明

## 🌍 国际化（i18n）支持

convertTools v2.0.0+ 现已支持中英文切换功能！

---

## ✨ 功能特性

### 1. 支持的语言
- 🇨🇳 **简体中文** (zh-CN)
- 🇺🇸 **English** (en-US)

### 2. 自动语言检测
- 首次访问时自动检测浏览器语言
- 中文浏览器自动显示中文界面
- 其他语言默认显示英文界面

### 3. 语言偏好保存
- 用户选择的语言会保存到 localStorage
- 下次访问时自动使用上次选择的语言
- 无需每次都手动切换

### 4. 实时切换
- 点击语言切换按钮即时生效
- 所有文本立即更新为新语言
- 无需刷新页面

---

## 🎯 使用方法

### 切换语言步骤

1. **找到语言切换按钮**
   - 位置：页面右上角 Header 区域
   - 在 "History" 和 "GitHub" 按钮之间
   - 显示当前语言（🇨🇳 中文 或 🇺🇸 EN）

2. **点击语言按钮**
   - 点击后会弹出语言选择菜单
   - 显示所有支持的语言

3. **选择目标语言**
   - 点击 "中文" 切换到简体中文
   - 点击 "English" 切换到英文
   - 当前选中的语言会高亮显示

4. **完成切换**
   - 界面立即更新为新语言
   - 菜单自动关闭
   - 语言偏好已保存

---

## 📂 文件结构

```
src/
├── locales/
│   ├── index.ts       # 多语言核心功能
│   ├── zh-CN.ts       # 中文翻译
│   └── en-US.ts       # 英文翻译
└── App.vue            # 主应用（已集成多语言）
```

---

## 🔧 技术实现

### 1. 核心 API

#### `t(key, params?)`
获取翻译文本

```typescript
// 简单翻译
t('header.github')  // → "GitHub" 或 "GitHub"

// 带参数翻译
t('messages.success', { count: 5 })  
// → "✅ 5 个文件转换成功！" 或 "✅ 5 files converted!"
```

#### `setLocale(locale)`
设置当前语言

```typescript
setLocale('zh-CN')  // 切换到中文
setLocale('en-US')  // 切换到英文
```

#### `getLocale()`
获取当前语言

```typescript
const current = getLocale()  // → 'zh-CN' 或 'en-US'
```

#### `initLocale()`
初始化语言（从 localStorage 或浏览器检测）

```typescript
const locale = initLocale()  // 自动检测并设置
```

#### `getSupportedLocales()`
获取所有支持的语言列表

```typescript
const locales = getSupportedLocales()
// → [
//     { code: 'zh-CN', name: '中文' },
//     { code: 'en-US', name: 'English' }
//   ]
```

---

### 2. Vue 组件集成

```vue
<script setup lang="ts">
import { t, initLocale, setLocale, getSupportedLocales } from './locales'

// 初始化语言
const currentLocale = ref(initLocale())
const supportedLocales = getSupportedLocales()

// 切换语言
function switchLanguage(locale) {
  setLocale(locale)
  currentLocale.value = locale
}
</script>

<template>
  <!-- 使用翻译 -->
  <h1>{{ t('hero.title') }}</h1>
  
  <!-- 语言切换器 -->
  <select @change="switchLanguage($event.target.value)">
    <option v-for="lang in supportedLocales" :key="lang.code" :value="lang.code">
      {{ lang.name }}
    </option>
  </select>
</template>
```

---

### 3. 翻译文件格式

```typescript
// zh-CN.ts
export default {
  header: {
    github: 'GitHub',
    support: '支持 ❤️',
  },
  messages: {
    success: '✅ {count} 个文件转换成功！',
  },
}
```

```typescript
// en-US.ts
export default {
  header: {
    github: 'GitHub',
    support: 'Support ❤️',
  },
  messages: {
    success: '✅ {count} files converted!',
  },
}
```

---

## 📝 翻译键值规范

### 命名规则
- 使用小驼峰命名：`camelCase`
- 按模块分组：`module.key`
- 层级不超过 3 层：`module.submodule.key`

### 示例
```
header.github          ✅ 好
header.buttons.github  ✅ 好
header.btn.gh.text     ❌ 太深

formats.csvJson        ✅ 好
csv_json_format        ❌ 不使用下划线
FORMATS_CSVJSON        ❌ 不大写
```

---

## 🌐 已翻译的内容

### 完整翻译的模块（100%）

| 模块 | 键数量 | 状态 |
|------|--------|------|
| header | 3 | ✅ |
| hero | 4 | ✅ |
| formats | 6 | ✅ |
| inputMode | 2 | ✅ |
| upload | 9 | ✅ |
| sizeWarning | 1 | ✅ |
| convert | 2 | ✅ |
| progress | 1 | ✅ |
| messages | 6 | ✅ |
| output | 3 | ✅ |
| batchOutput | 1 | ✅ |
| history | 5 | ✅ |
| upgrade | 18 | ✅ |
| activation | 2 | ✅ |
| errors | 11 | ✅ |
| features | 6 | ✅ |
| footer | 2 | ✅ |
| textTools | 6 | ✅ |
| time | 3 | ✅ |
| pricing | 12 | ✅ |
| **总计** | **103** | **✅** |

---

## 🔄 添加新语言

### 步骤 1: 创建翻译文件

```typescript
// src/locales/ja-JP.ts
export default {
  header: {
    github: 'GitHub',
    support: 'サポート ❤️',
    history: '📋 履歴',
  },
  // ... 其他翻译
}
```

### 步骤 2: 注册新语言

```typescript
// src/locales/index.ts
import jaJP from './ja-JP'

const messages: Record<Locale, any> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,  // 新增
}

export type Locale = 'zh-CN' | 'en-US' | 'ja-JP'  // 新增
```

### 步骤 3: 更新支持的语言列表

```typescript
export function getSupportedLocales() {
  return [
    { code: 'zh-CN', name: '中文' },
    { code: 'en-US', name: 'English' },
    { code: 'ja-JP', name: '日本語' },  // 新增
  ]
}
```

---

## 💡 最佳实践

### 1. 保持一致性
- 所有文本都使用 `t()` 函数
- 不要硬编码文本字符串
- 保持翻译文件的结构一致

### 2. 参数化文本
```typescript
// ❌ 不好
t('messages.converted5Files')

// ✅ 好
t('messages.success', { count: 5 })
```

### 3. 避免过长键名
```typescript
// ❌ 太长
t('mainContent.converterSection.outputArea.copyButton.tooltip')

// ✅ 简洁
t('output.copy')
```

### 4. 复用翻译
```typescript
// ❌ 重复
t('button.submit')
t('form.submitButton')

// ✅ 复用
t('common.submit')
```

---

## 🐛 常见问题

### Q1: 为什么有些文本没有翻译？
**A**: 可能该文本还未添加到翻译文件中。请检查：
1. 翻译文件中是否有对应的键
2. 代码中是否正确使用 `t()` 函数
3. 键名是否拼写正确

### Q2: 切换语言后部分内容未更新？
**A**: 确保使用的是响应式数据：
```typescript
// ❌ 不会响应变化
const label = t('formats.csvJson')

// ✅ 使用 computed
const label = computed(() => t('formats.csvJson'))
```

### Q3: 如何调试翻译问题？
**A**: 
1. 打开浏览器控制台
2. 查看是否有 "Translation key not found" 警告
3. 检查当前语言：`console.log(getLocale())`
4. 检查翻译文件是否正确加载

### Q4: 语言切换后刷新页面又变回去了？
**A**: 检查 localStorage 是否正常：
```javascript
// 在控制台运行
localStorage.getItem('convertTools_locale')
```

---

## 📊 翻译统计

### 代码行数
- **zh-CN.ts**: 204 行
- **en-US.ts**: 204 行
- **index.ts**: 84 行
- **总计**: 492 行

### 翻译条目
- **总键数**: 103 个
- **中文翻译**: 103 条
- **英文翻译**: 103 条
- **覆盖率**: 100%

### 文件大小
- **zh-CN.ts**: ~4 KB
- **en-US.ts**: ~4 KB
- **index.ts**: ~2 KB
- **压缩后**: ~3 KB

---

## 🚀 性能优化

### 1. 按需加载
当前实现已将所有语言打包，对于少量语言这是最优方案。

### 2. 缓存机制
- 翻译对象在内存中缓存
- 语言偏好存储在 localStorage
- 避免重复计算

### 3. 响应式更新
- 使用 Vue 的响应式系统
- 语言切换时自动更新所有文本
- 无需手动刷新

---

## 🎓 扩展阅读

### 相关资源
- [Vue i18n 官方文档](https://vue-i18n.intlify.dev/)
- [国际化最佳实践](https://www.w3.org/International/)
- [Unicode CLDR](https://cldr.unicode.org/)

### 工具推荐
- **i18n Ally** - VS Code 国际化插件
- **Lokalise** - 在线翻译管理平台
- **Crowdin** - 协作翻译平台

---

## 🤝 贡献翻译

欢迎贡献新的语言翻译或改进现有翻译！

### 提交方式
1. Fork 项目
2. 创建新的翻译文件或改进现有翻译
3. 提交 Pull Request
4. 等待审核合并

### 翻译指南
- 保持语气友好、专业
- 使用通俗易懂的语言
- 注意文化差异
- 保持术语一致性

---

## 📞 反馈与建议

如有任何问题或建议：
- 🐛 GitHub Issues: https://github.com/dabaiInJesus/convertTools/issues
- 💬 Discussions: https://github.com/dabaiInJesus/convertTools/discussions

---

**最后更新**: 2026-05-09  
**版本**: v2.0.0  
**支持语言**: 中文、English
