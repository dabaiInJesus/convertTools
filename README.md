# convertTools 🌍

> All-in-One File Format Converter — Free, Fast & Private

**Live:** [https://dabaiInJesus.github.io/convertTools/](https://dabaiInJesus.github.io/convertTools/)

## ✨ Features

- 🔄 **Spreadsheet Formats** — CSV, Excel (.xlsx/.xls), JSON, XML, TSV, YAML
- 📊 **Bidirectional Conversion** — Convert between any supported formats
- 📂 **Batch Convert** — Convert multiple files at once, download as ZIP
- 🔤 **Text Tools** — Base64 encode/decode, URL encode/decode, format detection
- 📱 **100% Browser-based** — No server upload, your files stay private
- 🌙 **Dark Mode** — Auto-detects system preference, manual toggle
- 🚀 **Fast & Free** — No limits, no signup, no ads

## 💰 Pricing

**100% Free & Open Source** — MIT License

If you find this useful, consider:

- ⭐ [Star on GitHub](https://github.com/dabaiInJesus/convertTools)
- 🐛 [Report Issues](https://github.com/dabaiInJesus/convertTools/issues)

## 🛠️ Tech Stack

- Vue 3 (Composition API + TypeScript)
- Tailwind CSS
- Vite
- SheetJS (xlsx) for Excel parsing
- JSZip for batch ZIP downloads

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## 📦 Deploy to GitHub Pages

```bash
npm run deploy
```

Or use the GitHub Actions workflow (automatic on push to main/master).

## 📁 Project Structure

```
convertTools/
├── index.html          # Entry HTML
├── src/
│   ├── main.ts        # Vue app entry
│   ├── style.css      # Tailwind CSS
│   └── App.vue        # Main converter UI
├── public/
│   └── favicon.svg    # Site favicon
├── deploy.sh          # Manual deploy script
└── package.json
```

## 🔄 Supported Conversions

| From/To | CSV | JSON | Excel | XML | TSV | YAML |
|---------|-----|------|-------|-----|-----|------|
| **CSV** | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| **JSON** | ✅ | — | ✅ | ✅ | ✅ | ✅ |
| **Excel** | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| **XML** | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| **TSV** | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| **YAML** | ✅ | ✅ | ✅ | ✅ | ✅ | — |

## 🤝 Contributing

Ideas welcome! Open an issue or PR.

## 📄 License

MIT — See [LICENSE](LICENSE)
