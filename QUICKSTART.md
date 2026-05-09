# convertTools 快速启动指南

## 🚀 5 分钟快速开始

### 1️⃣ 安装依赖（首次使用）

```bash
npm install
```

### 2️⃣ 启动开发服务器

```bash
npm run dev
```

访问: http://localhost:5173/convertTools/

### 3️⃣ 开始使用

#### 方式 A：文件上传转换
1. 选择转换格式（如 CSV ↔ JSON）
2. 拖拽文件或点击上传
3. 选择源格式和目标格式
4. 点击 "Convert" 按钮
5. 复制或下载结果

#### 方式 B：文本粘贴转换
1. 点击 "Paste Text" 切换模式
2. 粘贴你的数据
3. 选择源格式和目标格式
4. 点击 "Convert" 按钮
5. 复制或下载结果

---

## 📖 常用场景示例

### 场景 1：CSV 转 JSON

**输入 CSV：**
```csv
name,age,city
John,30,New York
Jane,25,London
```

**输出 JSON：**
```json
[
  {
    "name": "John",
    "age": "30",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": "25",
    "city": "London"
  }
]
```

### 场景 2：JSON 转 Excel

1. 选择 "Excel ↔ JSON" 格式
2. 设置 From: JSON, To: Excel
3. 粘贴 JSON 数据
4. 点击 Convert
5. Excel 文件自动下载

### 场景 3：批量转换多个文件

1. 选择 "📁 Batch Convert"
2. 点击 "Select Multiple Files"
3. 选择多个 CSV/JSON/Excel 文件
4. 选择输出格式（如 JSON）
5. 点击 Convert
6. 等待进度条完成
7. 点击 "Download All (ZIP)" 下载所有结果

### 场景 4：Base64 编码

1. 选择 "Text Tools"
2. 输入要编码的文本
3. 选择 To: Base64 Encode
4. 点击 Convert
5. 获取 Base64 字符串

### 场景 5：JSON 转 XML

1. 选择 "JSON ↔ XML" 格式
2. 设置 From: JSON, To: XML
3. 粘贴 JSON 数据
4. 点击 Convert
5. 获取 XML 格式输出

---

## 🎯 快捷键提示

- **Ctrl/Cmd + V**: 粘贴文本
- **Ctrl/Cmd + C**: 复制输出
- **Drag & Drop**: 拖拽文件上传

---

## 💡 专业技巧

### 1. 处理大型 CSV 文件
- 确保 CSV 有正确的表头行
- 如果字段包含逗号，用双引号包裹
- 示例：`"Smith, John",30,"New York"`

### 2. Excel 多工作表
- 当前版本仅转换第一个工作表
- 如需转换其他工作表，请先在 Excel 中移动目标工作表到第一位

### 3. XML 格式要求
- JSON 转 XML 时，数组元素会被包装在 `<item>` 标签中
- XML 转 JSON 时，期望 `<item>` 结构

### 4. 批量处理最佳实践
- 建议一次不超过 50 个文件
- 文件大小总和不超过限制（Free: 5MB, Pro: 50MB）
- 使用 ZIP 下载避免浏览器多次下载弹窗

### 5. 历史记录利用
- 开启 History 侧边栏查看最近转换
- 点击历史项可快速恢复输出
- 适合需要反复调整格式的场景

---

## 🔧 常见问题

### Q1: 为什么我的 CSV 转换后数据不对？
**A**: 检查 CSV 格式：
- 确保第一行是表头
- 特殊字符用双引号包裹
- 避免空行

### Q2: Excel 文件上传后没反应？
**A**: 
- 确认文件格式是 .xlsx 或 .xls
- 检查文件大小是否超过限制
- 查看浏览器控制台是否有错误

### Q3: 如何升级 Pro 版本？
**A**: 
1. 点击右上角 "Support ❤️"
2. 输入许可证密钥（格式：CH-PRO-XXXX-XXXX-XXXX）
3. 点击 Activate

### Q4: 批量转换可以自定义每个文件的输出格式吗？
**A**: 当前版本所有文件使用相同的输出格式。如需不同格式，请分批转换。

### Q5: 转换后的数据可以在页面中编辑吗？
**A**: 当前版本不支持在线编辑。建议：
1. 下载转换结果
2. 在本地编辑器修改
3. 重新上传转换

---

## 📱 移动端使用

convertTools 完全支持移动设备：

1. **上传文件**：点击上传区域，从相册或文件管理器选择
2. **粘贴文本**：长按输入框粘贴
3. **下载结果**：点击下载按钮，文件保存到设备
4. **复制内容**：点击 Copy 按钮，粘贴到其他应用

---

## 🌐 在线版本

无需安装，直接使用在线版本：

👉 https://dabaiInJesus.github.io/convertTools/

---

## 🛠️ 高级配置

### 修改文件大小限制

编辑 `src/App.vue`：

```typescript
const dataSizeLimit = ref(5 * 1024 * 1024) // 改为需要的值
const proDataSizeLimit = ref(50 * 1024 * 1024) // Pro 限制
```

### 自定义主题颜色

编辑 `src/App.vue`，搜索并替换颜色类：
- `bg-indigo-600` → 主色调
- `bg-green-500` → 成功色
- `bg-amber-500` → 警告色

### 添加新格式

1. 在 `formats` 数组中添加新格式
2. 在 `currentOptions` computed 中添加选项
3. 实现相应的转换函数
4. 更新 `acceptedFileTypes` computed

---

## 📞 获取帮助

- 📖 查看完整文档：README.md
- 🐛 报告问题：GitHub Issues
- 💬 讨论交流：GitHub Discussions
- ☕ 支持项目：Buy Me a Coffee

---

## 🎉 开始使用吧！

现在你已经了解了所有基础知识，开始转换你的文件吧！

如有任何问题，随时查阅本文档或提交 Issue。

Happy Converting! 🚀
