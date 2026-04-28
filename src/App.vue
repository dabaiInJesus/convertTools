<template>
  <div class="min-h-screen transition-colors" :class="isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'">

    <!-- Header -->
    <header :class="isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'" class="shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">CH</span>
          </div>
          <span :class="isDark ? 'text-white' : 'text-gray-900'" class="text-xl font-bold">convertTools</span>
          <span class="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full font-medium">v1.1.0</span>
        </div>
        <div class="flex items-center gap-4">
          <!-- Dark mode toggle -->
          <button @click="isDark = !isDark" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition" :title="isDark ? 'Light mode' : 'Dark mode'">
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
          <a href="https://github.com/dabaiInJesus/convertTools" target="_blank" :class="isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'" class="text-sm">GitHub</a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 :class="isDark ? 'text-white' : 'text-gray-900'" class="text-4xl font-bold mb-3">All-in-One File Format Converter</h1>
      <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="text-lg mb-4">Convert CSV, Excel, JSON, XML, Base64 in seconds. No installation. Free forever.</p>
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
        <span class="text-green-700 text-sm">🎉 100% Free & Open Source</span>
        <a href="https://github.com/dabaiInJesus/convertTools" target="_blank" class="text-green-600 hover:text-green-800 text-sm font-semibold underline">Star on GitHub ⭐</a>
      </div>
    </section>

    <!-- Converter Card -->
    <main class="max-w-6xl mx-auto px-4 pb-16">
      <div :class="isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-2xl shadow-lg overflow-hidden">

        <!-- Format Selector -->
        <div :class="isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'" class="border-b p-4">
          <div class="flex items-center justify-center gap-3 flex-wrap">
            <button
              v-for="fmt in formats"
              :key="fmt.id"
              @click="selectedFormat = fmt.id; resetConversion()"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                selectedFormat === fmt.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              ]"
            >
              {{ fmt.label }}
            </button>
          </div>
        </div>

        <!-- Converter Area -->
        <div class="p-6">

          <!-- From/To Selector -->
          <div class="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <select
              v-model="fromFormat"
              @change="updateToOptions"
              :class="isDark ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-700 border-gray-300'"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option v-for="fmt in currentOptions" :key="fmt" :value="fmt">{{ fmt }}</option>
            </select>
            <button @click="swapFormats" class="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition" title="Swap">
              ⇄
            </button>
            <select
              v-model="toFormat"
              :class="isDark ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-700 border-gray-300'"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option v-for="fmt in currentOptions" :key="fmt" :value="fmt">{{ fmt }}</option>
            </select>
          </div>

          <!-- File Upload / Text Input Toggle -->
          <div class="flex items-center justify-center gap-4 mb-4">
            <button
              @click="inputMode = 'file'"
              :class="['text-sm font-medium', inputMode === 'file' ? 'text-indigo-600' : isDark ? 'text-gray-400' : 'text-gray-500']"
            >
              📁 Upload File
            </button>
            <span class="text-gray-300">|</span>
            <button
              @click="inputMode = 'text'"
              :class="['text-sm font-medium', inputMode === 'text' ? 'text-indigo-600' : isDark ? 'text-gray-400' : 'text-gray-500']"
            >
              ⌨️ Paste Text
            </button>
          </div>

          <!-- Batch Mode UI -->
          <div v-if="selectedFormat === 'batch'" class="mb-6">
            <div :class="isDark ? 'border-amber-600 bg-amber-900/30' : 'border-amber-300 bg-amber-50'" class="border-2 border-dashed rounded-xl p-8 text-center">
              <div class="text-4xl mb-3">📁</div>
              <p :class="isDark ? 'text-amber-300' : 'text-amber-800'" class="font-semibold mb-2">Batch Convert</p>
              <p :class="isDark ? 'text-amber-400' : 'text-amber-600'" class="text-sm mb-4">Convert multiple files at once</p>
              <input ref="batchFileInputRef" type="file" multiple class="hidden" @change="handleBatchFiles" accept=".csv,.xlsx,.xls,.json,.xml,.tsv,.txt" />
              <button @click="batchFileInputRef?.click()" class="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition">
                📂 Select Multiple Files
              </button>
              <div v-if="batchFiles.length > 0" class="mt-4 text-left max-w-md mx-auto">
                <p :class="isDark ? 'text-amber-300' : 'text-amber-700'" class="text-sm font-medium mb-2">{{ batchFiles.length }} files selected:</p>
                <div :class="isDark ? 'bg-gray-700' : 'bg-white'" class="max-h-40 overflow-y-auto rounded-lg space-y-1 p-2">
                  <div v-for="(f, idx) in batchFiles" :key="idx" class="flex items-center justify-between rounded px-3 py-2 text-sm">
                    <span :class="isDark ? 'text-gray-300' : 'text-gray-700'" class="truncate">{{ f.name }}</span>
                    <span :class="isDark ? 'text-gray-500' : 'text-gray-400'" class="ml-2 text-xs">{{ formatSize(f.size) }}</span>
                  </div>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <span :class="isDark ? 'text-amber-300' : 'text-amber-700'" class="text-sm font-medium">Output: {{ toFormat }}</span>
                  <button @click="batchFiles = []; batchOutput = []" class="text-sm text-gray-500 hover:text-gray-700">Clear all</button>
                </div>
                <div class="mt-3 flex gap-2">
                  <button @click="batchConvert" :disabled="converting" class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50">
                    {{ converting ? '⚡ Converting...' : '🔄 Convert All' }}
                  </button>
                  <button v-if="batchOutput.length > 0" @click="downloadBatchZip" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition">
                    ⬇️ Download ZIP
                  </button>
                </div>
                <!-- Batch Output Preview -->
                <div v-if="batchOutput.length > 0" class="mt-3 p-3 rounded-lg" :class="isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'">
                  <p :class="isDark ? 'text-green-400' : 'text-green-700'" class="text-sm font-medium">✅ {{ batchOutput.length }} files converted!</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Single File Input Area -->
          <div v-else class="mb-6">
            <div v-if="inputMode === 'file'"
              @click="fileInputRef?.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
              :class="[
                'border-2 border-dashed rounded-xl p-12 text-center hover:border-indigo-400 transition cursor-pointer',
                isDark ? 'border-gray-600 hover:border-indigo-400' : 'border-gray-300'
              ]"
            >
              <input ref="fileInputRef" type="file" class="hidden" @change="handleFile" :accept="acceptedFileTypes" />
              <div class="text-4xl mb-3">📤</div>
              <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="font-medium">Drop your file here or click to browse</p>
              <p :class="isDark ? 'text-gray-500' : 'text-gray-400'" class="text-sm mt-1">{{ acceptedFileTypes }} files supported</p>
              <div v-if="inputFile" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'" class="mt-2 text-sm font-medium">
                {{ inputFile.name }} ({{ formatSize(inputFile.size) }})
              </div>
            </div>
            <div v-else>
              <textarea
                v-model="inputText"
                :class="isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'"
                class="w-full h-48 p-4 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                :placeholder="'Paste your ' + fromFormat + ' content here...'"
              ></textarea>
              <p :class="isDark ? 'text-gray-500' : 'text-gray-400'" class="text-xs mt-1 text-right">{{ formatSize(currentDataSize) }}</p>
            </div>
          </div>

          <!-- Convert Button -->
          <div class="text-center mb-6">
            <button
              @click="convert"
              :disabled="!canConvert || converting"
              class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
            >
              <span v-if="converting">⚡ Converting...</span>
              <span v-else>🔄 Convert to {{ toFormat }}</span>
            </button>
          </div>

          <!-- Error -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            ⚠️ {{ error }}
          </div>

          <!-- Output Area -->
          <div v-if="output" :class="isDark ? 'bg-gray-900' : 'bg-gray-900'" class="rounded-xl p-4 relative">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-medium">Output ({{ toFormat.toUpperCase() }})</span>
              <div class="flex items-center gap-2">
                <span :class="isDark ? 'text-gray-500' : 'text-gray-500'" class="text-xs">{{ formatSize(output.length) }}</span>
                <button @click="copyOutput" :class="isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'" class="px-3 py-1 text-xs rounded-lg transition">
                  {{ copied ? '✅ Copied!' : '📋 Copy' }}
                </button>
                <button @click="downloadOutput" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition">
                  ⬇️ Download
                </button>
              </div>
            </div>
            <textarea
              :value="output"
              readonly
              :class="isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-800 text-gray-100'"
              class="w-full h-48 bg-gray-800 text-gray-100 p-3 rounded-lg text-sm font-mono resize-none focus:outline-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div :class="isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">🚀</div>
          <h3 :class="isDark ? 'text-white' : 'text-gray-900'" class="font-semibold mb-1">Lightning Fast</h3>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-500'" class="text-sm">Convert files instantly in your browser. No server upload needed.</p>
        </div>
        <div :class="isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">🔒</div>
          <h3 :class="isDark ? 'text-white' : 'text-gray-900'" class="font-semibold mb-1">100% Private</h3>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-500'" class="text-sm">Your files never leave your device. Everything runs locally.</p>
        </div>
        <div :class="isDark ? 'bg-gray-800' : 'bg-white'" class="rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">💯</div>
          <h3 :class="isDark ? 'text-white' : 'text-gray-900'" class="font-semibold mb-1">100% Free</h3>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-500'" class="text-sm">No limits, no signup, no ads. Open source forever.</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer :class="isDark ? 'text-gray-500 border-gray-700' : 'text-gray-400 border-gray-200'" class="text-center py-6 text-sm border-t">
      Built with ❤️ by <a href="https://github.com/dabaiInJesus" class="text-indigo-500 hover:underline">@dabaiInJesus</a> · Powered by Vue3 · <a href="https://github.com/dabaiInJesus/convertTools/releases" class="text-indigo-500 hover:underline">Releases</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import JSZip from 'jszip'

// State
const isDark = ref(false)
const selectedFormat = ref('spreadsheet')
const fromFormat = ref('CSV')
const toFormat = ref('JSON')
const inputMode = ref<'file' | 'text'>('file')
const inputFile = ref<File | null>(null)
const inputText = ref('')
const output = ref('')
const converting = ref(false)
const error = ref('')
const copied = ref(false)
const batchFiles = ref<File[]>([])
const batchOutput = ref<{ name: string; blob: Blob; size: number }[]>([])
const batchFileInputRef = ref<HTMLInputElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

// Formats
const formats = [
  { id: 'spreadsheet', label: '📊 Spreadsheet' },
  { id: 'text', label: '🔤 Text Tools' },
  { id: 'batch', label: '📁 Batch' },
]

const spreadsheetOptions = ['CSV', 'JSON', 'Excel', 'XML', 'TSV', 'YAML']
const textToolOptions = ['Plain Text', 'Base64', 'URL Encode', 'URL Decode', 'JSON', 'CSV']
const batchOptions = ['CSV', 'JSON', 'XML', 'TSV', 'YAML']

const currentOptions = computed(() => {
  if (selectedFormat.value === 'spreadsheet') return spreadsheetOptions
  if (selectedFormat.value === 'text') return textToolOptions
  return batchOptions
})

const acceptedFileTypes = computed(() => {
  if (selectedFormat.value === 'spreadsheet') return '.csv,.xlsx,.xls,.json,.xml,.tsv,.yaml,.yml'
  if (selectedFormat.value === 'text') return '.txt,.csv,.json,.xml,.md'
  return '.csv,.xlsx,.xls,.json,.xml,.tsv,.yaml,.yml,.txt'
})

const canConvert = computed(() => {
  if (selectedFormat.value === 'batch') return batchFiles.value.length > 0
  if (inputMode.value === 'file') return !!inputFile.value
  return inputText.value.trim().length > 0
})

const currentDataSize = computed(() => {
  if (inputMode.value === 'text') return new Blob([inputText.value]).size
  return inputFile.value?.size || 0
})

// Auto-update toFormat when fromFormat changes
function updateToOptions() {
  const opts = currentOptions.value
  if (!opts.includes(toFormat.value)) {
    toFormat.value = opts.find(o => o !== fromFormat.value) || opts[0]
  }
}

function resetConversion() {
  output.value = ''
  error.value = ''
  updateToOptions()
}

function swapFormats() {
  const temp = fromFormat.value
  fromFormat.value = toFormat.value
  toFormat.value = temp
  output.value = ''
}

// File handling
function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    inputFile.value = target.files[0]
    output.value = ''
    error.value = ''
  }
}

function handleDrop(e: DragEvent) {
  const files = e.dataTransfer?.files
  if (files?.length) {
    if (selectedFormat.value === 'batch') {
      batchFiles.value = [...batchFiles.value, ...Array.from(files)]
    } else {
      inputFile.value = files[0]
      output.value = ''
    }
  }
}

function handleBatchFiles(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    batchFiles.value = [...batchFiles.value, ...Array.from(target.files)]
  }
}

// Utility
function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function readFile(file: File): Promise<string | any> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (['xlsx', 'xls'].includes(ext || '')) {
    return readExcel(file)
  }
  return readTextFile(file)
}

async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

async function readExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      resolve(XLSX.utils.sheet_to_json(sheet, { defval: '' }))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// Parsers & Converters
function parseCSV(text: string): any[] {
  const lines = text.trim().split('\n')
  if (!lines.length) return []
  // Handle potential header line
  const result: any[] = []
  const headers = parseCSVLine(lines[0])
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const obj: any = {}
    headers.forEach((h, idx) => { obj[h] = values[idx] || '' })
    result.push(obj)
  }
  return result
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

function csvToJson(csv: string): any[] {
  return parseCSV(csv)
}

function jsonToCsv(data: any[]): string {
  if (!data.length) return ''
  const headers = Object.keys(data[0])
  const csvRows = [headers.map(h => `"${h}"`).join(',')]
  for (const row of data) {
    csvRows.push(headers.map(h => {
      const val = String(row[h] ?? '')
      return `"${val.replace(/"/g, '""')}"`
    }).join(','))
  }
  return csvRows.join('\n')
}

function parseTSV(text: string): any[] {
  const lines = text.trim().split('\n')
  if (!lines.length) return []
  const result: any[] = []
  const headers = lines[0].split('\t').map(h => h.trim())
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t').map(v => v.trim())
    const obj: any = {}
    headers.forEach((h, idx) => { obj[h] = values[idx] || '' })
    result.push(obj)
  }
  return result
}

function tsvToJson(tsv: string): any[] {
  return parseTSV(tsv)
}

function jsonToTsv(data: any[]): string {
  if (!data.length) return ''
  const headers = Object.keys(data[0])
  const rows = [headers.join('\t')]
  for (const row of data) {
    rows.push(headers.map(h => String(row[h] ?? '')).join('\t'))
  }
  return rows.join('\n')
}

function parseXML(text: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/xml')
  const parseError = doc.querySelector('parsererror')
  if (parseError) throw new Error('Invalid XML format')
  return xmlToJson(doc.documentElement)
}

function xmlToJson(node: Element): any {
  const obj: any = {}
  if (node.attributes?.length) {
    for (const attr of node.attributes) {
      obj['@' + attr.name] = attr.value
    }
  }
  if (node.children?.length) {
    const children: any[] = []
    const childMap: any = {}
    for (const child of node.children) {
      const childObj = xmlToJson(child)
      const tagName = child.tagName
      if (childMap[tagName]) {
        if (!Array.isArray(childMap[tagName])) childMap[tagName] = [childMap[tagName]]
        childMap[tagName].push(childObj)
      } else {
        childMap[tagName] = childObj
      }
    }
    for (const [k, v] of Object.entries(childMap)) {
      obj[k] = Array.isArray(v) && v.length === 1 ? v[0] : v
    }
    if (Object.keys(childMap).length === 0) {
      obj['#text'] = node.textContent?.trim() || ''
    }
  } else {
    obj['#text'] = node.textContent?.trim() || ''
  }
  return obj
}

function jsonToXml(data: any, rootName = 'root'): string {
  let indent = ''
  function format(val: any, key: string, indentLevel: number): string {
    const ind = '  '.repeat(indentLevel)
    if (typeof val === 'object' && val !== null) {
      if (Array.isArray(val)) {
        return val.map(item => format(item, key, indentLevel)).join('\n')
      }
      const attrs: string[] = []
      const children: string[] = []
      for (const [k, v] of Object.entries(val)) {
        if (k.startsWith('@')) attrs.push(`${k.slice(1)}="${v}"`)
        else if (k === '#text') children.push(`${ind}  ${v}`)
        else children.push(format(v, k, indentLevel + 1))
      }
      const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
      if (children.length) {
        return `${ind}<${key}${attrStr}>\n${children.join('\n')}\n${ind}</${key}>`
      }
      return `${ind}<${key}${attrStr}/>`
    }
    return `${ind}<${key}${attrStr}>${val}</${key}>`
  }
  const content = format(data, rootName, 0)
  return `<?xml version="1.0" encoding="UTF-8"?>\n${content}`
}

function parseYAML(text: string): any {
  // Simple YAML parser for basic key-value and array structures
  const lines = text.trim().split('\n')
  let result: any = Array.isArray([]) ? [] : {}
  let currentKey = ''
  let currentArray: any[] = []
  let inArray = false
  let arrayIndent = 0

  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue
    const indent = line.search(/\S/)
    const trimmed = line.trim()

    if (trimmed.startsWith('- ')) {
      // Array item
      if (!inArray) {
        inArray = true
        arrayIndent = indent
        currentArray = []
      }
      const val = trimmed.slice(2).trim()
      if (val.includes(':')) {
        currentArray.push(parseYAMLLine(val, indent + 2))
      } else {
        currentArray.push(val.replace(/^["']|["']$/g, ''))
      }
    } else if (inArray && indent <= arrayIndent) {
      // End of array
      ;(result as any)[currentKey] = currentArray
      currentArray = []
      inArray = false
    }

    if (trimmed.includes(':') && !trimmed.startsWith('-')) {
      if (inArray) {
        ;(result as any)[currentKey] = currentArray
        currentArray = []
        inArray = false
      }
      const [key, ...rest] = trimmed.split(':')
      const value = rest.join(':').trim().replace(/^["']|["']$/g, '')
      if (value) {
        ;(result as any)[key.trim()] = value
      } else {
        currentKey = key.trim()
      }
    }
  }
  if (inArray) (result as any)[currentKey] = currentArray
  return result
}

function parseYAMLLine(line: string, indent: number): any {
  const result: any = {}
  const parts = line.split(',')
  for (const part of parts) {
    const [k, v] = part.split(':').map(s => s.trim())
    if (v !== undefined) result[k] = v.replace(/^["']|["']$/g, '')
  }
  return result
}

function yamlToJson(yaml: string): string {
  return JSON.stringify(parseYAML(yaml), null, 2)
}

function jsonToYaml(data: any): string {
  let indent = 0
  function format(val: any, key?: string): string {
    if (typeof val !== 'object' || val === null) {
      const valStr = typeof val === 'string' ? `"${val}"` : String(val)
      return key ? `${'  '.repeat(indent)}${key}: ${valStr}` : valStr
    }
    if (Array.isArray(val)) {
      if (key) return `${'  '.repeat(indent)}${key}:\n${val.map(v => format(v)).join('\n')}`
      return val.map(v => `${'  '.repeat(indent)}- ${format(v).trim()}`).join('\n')
    }
    const entries = Object.entries(val)
    if (!key) {
      indent++
      const str = entries.map(([k, v]) => format(v, k)).join('\n')
      indent--
      return str
    }
    indent++
    const inner = entries.map(([k, v]) => format(v, k)).join('\n')
    indent--
    return `${'  '.repeat(indent)}${key}:\n${inner}`
  }
  return format(data).trim()
}

function excelToJson(data: any[]): string {
  return JSON.stringify(data, null, 2)
}

function jsonToExcel(json: any[]): Blob {
  const worksheet = XLSX.utils.json_to_sheet(json)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  return new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }) as unknown as Blob], { type: 'application/octet-stream' })
}

// Main conversion
async function convert() {
  converting.value = true
  error.value = ''
  output.value = ''

  try {
    let inputData: string | any[]
    let jsonData: any[]

    // Read input
    if (inputMode.value === 'file' && inputFile.value) {
      const ext = inputFile.value.name.split('.').pop()?.toLowerCase()
      if (['xlsx', 'xls'].includes(ext || '')) {
        jsonData = await readExcel(inputFile.value)
        if (selectedFormat.value === 'text' && toFormat.value === 'JSON') {
          output.value = JSON.stringify(jsonData, null, 2)
          converting.value = false
          return
        }
      } else {
        inputData = await readTextFile(inputFile.value)
        jsonData = parseInput(inputData as string, ext || '')
      }
    } else {
      inputData = inputText.value
      const autoDetect = detectFormat(inputData as string)
      if (autoDetect) {
        fromFormat.value = autoDetect
      }
      jsonData = parseInput(inputData as string, fromFormat.value)
    }

    // Convert
    let result: string | Blob

    if (toFormat.value === 'JSON') {
      result = JSON.stringify(jsonData, null, 2)
    } else if (toFormat.value === 'CSV') {
      result = jsonToCsv(jsonData)
    } else if (toFormat.value === 'TSV') {
      result = jsonToTsv(jsonData)
    } else if (toFormat.value === 'XML') {
      const rootName = 'root'
      result = jsonToXml(jsonData, rootName)
    } else if (toFormat.value === 'YAML') {
      result = jsonToYaml(jsonData)
    } else if (toFormat.value === 'Excel') {
      const blob = jsonToExcel(jsonData)
      downloadBlob(blob, `converted.xlsx`)
      converting.value = false
      return
    } else if (toFormat.value === 'Base64') {
      result = btoa(unescape(encodeURIComponent(inputData as string)))
    } else if (toFormat.value === 'URL Encode') {
      result = encodeURIComponent(inputData as string)
    } else if (toFormat.value === 'URL Decode') {
      result = decodeURIComponent(inputData as string)
    } else if (toFormat.value === 'Plain Text') {
      result = typeof inputData === 'string' ? inputData : JSON.stringify(jsonData, null, 2)
    } else {
      result = typeof inputData === 'string' ? inputData : JSON.stringify(jsonData, null, 2)
    }

    output.value = result as string

  } catch (err: any) {
    error.value = err.message || 'Conversion failed. Please check your input.'
  }

  converting.value = false
}

function parseInput(text: string, format: string): any[] {
  switch (format) {
    case 'CSV': return csvToJson(text)
    case 'TSV': return tsvToJson(text)
    case 'XML': {
      const parsed = parseXML(text)
      return Array.isArray(parsed) ? parsed : [parsed]
    }
    case 'YAML': return parseYAML(text) as any[]
    case 'JSON': return JSON.parse(text)
    default: return [{}]
  }
}

function detectFormat(text: string): string | null {
  const trimmed = text.trim()
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try { JSON.parse(trimmed); return 'JSON' } catch {}
  }
  if (trimmed.startsWith('<?xml') || trimmed.startsWith('<')) return 'XML'
  if (trimmed.includes(':\n') || trimmed.includes(' - ')) return 'YAML'
  if (trimmed.includes('\t') && trimmed.split('\n')[0].includes('\t')) return 'TSV'
  if (trimmed.includes(',')) return 'CSV'
  return null
}

// Output actions
function copyOutput() {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function downloadOutput() {
  const ext = toFormat.value.toLowerCase()
  const mimeTypes: Record<string, string> = {
    json: 'application/json',
    csv: 'text/csv',
    xml: 'application/xml',
    tsv: 'text/tab-separated-values',
    yaml: 'text/yaml',
    'plain text': 'text/plain',
  }
  const mime = mimeTypes[ext] || 'text/plain'
  downloadBlob(new Blob([output.value], { type: mime }), `converted.${ext}`)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// Batch conversion
async function batchConvert() {
  if (!batchFiles.value.length) return

  converting.value = true
  error.value = ''
  batchOutput.value = []

  try {
    for (const file of batchFiles.value) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      let jsonData: any[]

      if (['xlsx', 'xls'].includes(ext || '')) {
        jsonData = await readExcel(file)
      } else {
        const text = await readTextFile(file)
        jsonData = parseInput(text, ext || fromFormat.value)
      }

      let result: string
      let mime: string
      let outExt: string

      if (toFormat.value === 'JSON') {
        result = JSON.stringify(jsonData, null, 2)
        mime = 'application/json'
        outExt = 'json'
      } else if (toFormat.value === 'CSV') {
        result = jsonToCsv(jsonData)
        mime = 'text/csv'
        outExt = 'csv'
      } else if (toFormat.value === 'TSV') {
        result = jsonToTsv(jsonData)
        mime = 'text/tab-separated-values'
        outExt = 'tsv'
      } else if (toFormat.value === 'XML') {
        result = jsonToXml(jsonData, 'root')
        mime = 'application/xml'
        outExt = 'xml'
      } else if (toFormat.value === 'YAML') {
        result = jsonToYaml(jsonData)
        mime = 'text/yaml'
        outExt = 'yaml'
      } else {
        result = JSON.stringify(jsonData, null, 2)
        mime = 'application/json'
        outExt = 'json'
      }

      const outputName = file.name.replace(/\.[^.]+$/, '') + '.' + outExt
      const blob = new Blob([result], { type: mime })
      batchOutput.value.push({ name: outputName, blob, size: blob.size })
    }
  } catch (err: any) {
    error.value = err.message || 'Batch conversion failed.'
  }

  converting.value = false
}

async function downloadBatchZip() {
  if (!batchOutput.value.length) return

  const zip = new JSZip()
  for (const item of batchOutput.value) {
    zip.file(item.name, item.blob)
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(zipBlob, 'converted_files.zip')
}

// Load dark mode preference
onMounted(() => {
  const stored = localStorage.getItem('convertTools_darkMode')
  if (stored !== null) isDark.value = stored === 'true'
  else isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

// Save dark mode preference
$watch(isDark, (val) => {
  localStorage.setItem('convertTools_darkMode', String(val))
})
</script>
