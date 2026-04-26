<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">CH</span>
          </div>
          <span class="text-xl font-bold text-gray-900">convertTools</span>
        </div>
        <div class="flex items-center gap-4">
          <a href="https://github.com/dabaiInJesus" target="_blank" class="text-gray-500 hover:text-gray-700 text-sm">GitHub</a>
          <button @click="showUpgradeModal = true" class="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition shadow-md">
            Support ❤️
          </button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">All-in-One File Format Converter</h1>
      <p class="text-gray-600 text-lg mb-4">Convert CSV, Excel, JSON, XML in seconds. No installation. Free.</p>
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
        <span class="text-green-700 text-sm">🎉 100% Free & Open Source</span>
        <button @click="showUpgradeModal = true" class="text-green-600 hover:text-green-800 text-sm font-semibold underline">Support ❤️</button>
      </div>
    </section>

    <!-- Converter Card -->
    <main class="max-w-6xl mx-auto px-4 pb-16">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Format Selector -->
        <div class="bg-gray-50 border-b border-gray-200 p-4">
          <div class="flex items-center justify-center gap-3 flex-wrap">
            <button
              v-for="fmt in formats"
              :key="fmt.id"
              @click="selectedFormat = fmt.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                selectedFormat === fmt.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              ]"
            >
              {{ fmt.label }}
            </button>
          </div>
        </div>

        <!-- Converter Area -->
        <div class="p-6">
          <!-- From/To Selector -->
          <div class="flex items-center justify-center gap-4 mb-6">
            <select
              v-model="fromFormat"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option v-for="fmt in currentOptions" :key="fmt" :value="fmt">{{ fmt }}</option>
            </select>
            <button @click="swapFormats" class="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <select
              v-model="toFormat"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option v-for="fmt in currentOptions" :key="fmt" :value="fmt">{{ fmt }}</option>
            </select>
          </div>

          <!-- File Upload / Text Input Toggle -->
          <div class="flex items-center justify-center gap-4 mb-4">
            <button
              @click="inputMode = 'file'"
              :class="['text-sm font-medium', inputMode === 'file' ? 'text-indigo-600' : 'text-gray-500']"
            >
              📁 Upload File
            </button>
            <span class="text-gray-300">|</span>
            <button
              @click="inputMode = 'text'"
              :class="['text-sm font-medium', inputMode === 'text' ? 'text-indigo-600' : 'text-gray-500']"
            >
              ⌨️ Paste Text
            </button>
          </div>

          <!-- Batch Mode UI -->
          <div v-if="selectedFormat === 'batch'" class="mb-6">
            <div class="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center bg-amber-50">
              <div class="text-4xl mb-3">📁</div>
              <p class="text-amber-800 font-semibold mb-2">Batch Convert (Pro)</p>
              <p class="text-amber-600 text-sm mb-4">Convert multiple files at once with same output format</p>
              <input ref="batchFileInput" type="file" multiple class="hidden" @change="handleBatchFiles" accept=".csv,.xlsx,.xls,.json,.txt" />
              <button @click="$refs.batchFileInput.click()" class="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition">
                📂 Select Multiple Files
              </button>
              <div v-if="batchFiles.length > 0" class="mt-4 text-left">
                <p class="text-sm text-amber-700 font-medium mb-2">{{ batchFiles.length }} files selected:</p>
                <div class="max-h-40 overflow-y-auto space-y-1">
                  <div v-for="(f, idx) in batchFiles" :key="idx" class="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-sm">
                    <span class="text-gray-700 truncate">{{ f.name }}</span>
                    <span class="text-gray-400 ml-2">{{ formatSize(f.size) }}</span>
                  </div>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-sm text-amber-700 font-medium">Output: {{ toFormat }}</span>
                  <button @click="clearBatchFiles" class="text-sm text-gray-500 hover:text-gray-700">Clear all</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Single File Input Area -->
          <div v-else class="mb-6">
            <!-- Size Warning -->
            

            <div v-if="inputMode === 'file'" class="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-400 transition cursor-pointer" @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
              <input ref="fileInput" type="file" class="hidden" @change="handleFile" :accept="acceptedFileTypes" />
              <div class="text-4xl mb-3">📤</div>
              <p class="text-gray-600 font-medium">Drop your file here or click to browse</p>
              <p class="text-gray-400 text-sm mt-1">{{ acceptedFileTypes }} files supported</p>
              <p v-if="inputFile" class="mt-2 text-sm text-indigo-600 font-medium">{{ inputFile.name }} ({{ formatSize(inputFile.size) }})</p>
            </div>
            <div v-else>
              <textarea
                v-model="inputText"
                class="w-full h-48 p-4 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                :placeholder="'Paste your ' + fromFormat + ' content here...'"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1 text-right">{{ formatSize(currentDataSize) }}</p>
            </div>
          </div>

          <!-- Batch Output -->
          <div v-if="selectedFormat === 'batch' && batchOutput.length > 0" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div class="flex items-center justify-between mb-3">
              <span class="text-green-700 font-medium">✅ {{ batchOutput.length }} files converted!</span>
              <button @click="downloadAllBatch" class="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition">
                ⬇️ Download All (ZIP)
              </button>
            </div>
            <div class="space-y-1">
              <div v-for="(item, idx) in batchOutput" :key="idx" class="text-sm text-gray-600 flex items-center gap-2">
                <span class="text-green-500">✓</span>
                <span class="truncate">{{ item.name }}</span>
                <span class="text-gray-400 text-xs">{{ formatSize(item.size) }}</span>
              </div>
            </div>
          </div>

          <!-- Convert Button -->
          <div class="text-center mb-6">
            <button
              @click="convert"
              :disabled="!canConvert || converting"
              class="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-200"
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
          <div v-if="output" class="bg-gray-900 rounded-xl p-4 relative">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm font-medium">Output ({{ toFormat.toUpperCase }})</span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">{{ formatSize(output.length) }}</span>
                <button @click="copyOutput" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded-lg transition">
                  {{ copied ? '✅ Copied!' : '📋 Copy' }}
                </button>
                <button @click="downloadOutput" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition">
                  ⬇️ Download
                </button>
              </div>
            </div>
            <textarea
              v-model="output"
              readonly
              class="w-full h-48 bg-gray-800 text-gray-100 p-3 rounded-lg text-sm font-mono resize-none focus:outline-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
          <p class="text-gray-500 text-sm">Convert files instantly in your browser. No server upload needed.</p>
        </div>
        <div class="bg-white rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">🔒</div>
          <h3 class="font-semibold text-gray-900 mb-1">100% Private</h3>
          <p class="text-gray-500 text-sm">Your files never leave your device. Everything runs locally.</p>
        </div>
        <div class="bg-white rounded-xl p-6 text-center shadow-sm">
          <div class="text-3xl mb-3">💯</div>
          <h3 class="font-semibold text-gray-900 mb-1">100% Free</h3>
          <p class="text-gray-500 text-sm">No limits, no signup, no ads. Open source forever.</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="text-center py-6 text-gray-400 text-sm">
      Built with ❤️ by <a href="https://github.com/dabaiInJesus" class="text-indigo-500 hover:underline">@dabaiInJesus</a> · Powered by Vue3
    </footer>

    <!-- Upgrade Modal -->
    <Teleport to="body">
      <div v-if="showUpgradeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showUpgradeModal = false">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-center">
            <div class="text-4xl mb-2">☕</div>
            <h2 class="text-2xl font-bold text-white">Support convertTools</h2>
            <p class="text-green-100 mt-1">This tool is 100% free & open source</p>
          </div>

          <!-- Modal Body -->
          <div class="p-6">
            <!-- Not Sponsor: Show support options -->
            <div v-if="!isPro">
              <div class="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 class="font-semibold text-gray-900 mb-3">If this tool saved you time 💪</h3>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex items-center gap-2">☕ <span>Buy me a coffee</span></li>
                  <li class="flex items-center gap-2">⭐ <span>Star on GitHub</span></li>
                  <li class="flex items-center gap-2">🔗 <span>Share with friends</span></li>
                </ul>
              </div>

              <!-- Support buttons -->
              <div class="space-y-3 mb-6">
                <a href="https://buymeacoffee.com/dabaiInJesus" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-center rounded-xl transition shadow-lg">
                  ☕ Buy Me a Coffee
                </a>
                <a href="https://github.com/dabaiInJesus/convertTools" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-center rounded-xl transition">
                  ⭐ Star on GitHub
                </a>
              </div>

              <!-- Sponsor badge divider -->
              <div class="flex items-center gap-3 my-6">
                <div class="flex-1 h-px bg-gray-200"></div>
                <span class="text-gray-400 text-sm">or enter sponsor code</span>
                <div class="flex-1 h-px bg-gray-200"></div>
              </div>
            </div>

            <!-- License Key Input -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">License Key</label>
              <input
                v-model="licenseKeyInput"
                type="text"
                placeholder="CH-PRO-XXXX-XXXX-XXXX"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <!-- Activation Error -->
            <div v-if="activationError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ⚠️ {{ activationError }}
            </div>

            <!-- Activation Success -->
            <div v-if="activationSuccess" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              ✅ {{ activationSuccess }}
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button @click="showUpgradeModal = false" class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition">
                {{ isPro ? 'Close' : 'Cancel' }}
              </button>
              <button v-if="isPro" @click="deactivatePro" class="flex-1 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-xl transition">
                Remove License
              </button>
              <button v-else @click="activateLicense" :disabled="!licenseKeyInput.trim()" class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition">
                Activate
              </button>
            </div>

            <!-- Pro badge if activated -->
            <div v-if="isPro" class="mt-4 p-3 bg-green-50 rounded-lg text-center">
              <span class="text-green-700 font-medium">✅ Pro Activated</span>
              <p class="text-gray-500 text-xs mt-1">License stored locally in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as XLSX from 'xlsx'

const formats = [
  { id: 'csv-json', label: 'CSV ↔ JSON' },
  { id: 'excel-json', label: 'Excel ↔ JSON' },
  { id: 'csv-excel', label: 'CSV ↔ Excel' },
  { id: 'text', label: 'Text Tools' },
  { id: 'batch', label: '📁 Batch Convert' },
]

const selectedFormat = ref('csv-json')
const inputMode = ref<'file' | 'text'>('file')
const inputFile = ref<File | null>(null)
const inputText = ref('')
const fromFormat = ref('CSV')
const toFormat = ref('JSON')
const output = ref('')
const error = ref('')
const converting = ref(false)
const copied = ref(false)

// Pro system
const isPro = ref(false)
const showUpgradeModal = ref(false)
const licenseKeyInput = ref('')
const activationError = ref('')
const activationSuccess = ref('')
const dataSizeLimit = 100 * 1024 * 1024 // 100MB for free tier

// Batch mode
const batchFiles = ref<File[]>([])
const batchOutput = ref<{ name: string; blob: Blob; size: number }[]>([])

const currentDataSize = computed(() => {
  if (inputMode.value === 'file' && inputFile.value) {
    return inputFile.value.size
  }
  return new Blob([inputText.value]).size
})

const currentOptions = computed(() => {
  switch (selectedFormat.value) {
    case 'csv-json': return ['CSV', 'JSON']
    case 'excel-json': return ['Excel', 'JSON']
    case 'csv-excel': return ['CSV', 'Excel']
    case 'text': return ['Base64', 'URL Encode', 'Plain Text']
    case 'batch': return ['JSON', 'CSV']
    default: return ['CSV', 'JSON']
  }
})

const acceptedFileTypes = computed(() => {
  switch (selectedFormat.value) {
    case 'csv-json':
    case 'csv-excel':
      return '.csv,.txt'
    case 'excel-json':
      return '.xlsx,.xls,.csv'
    default:
      return '*'
  }
})

const canConvert = computed(() => {
  if (selectedFormat.value === 'batch') return batchFiles.value.length > 0
  if (inputMode.value === 'file') return !!inputFile.value
  return inputText.value.trim().length > 0
})

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function handleBatchFiles(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files) {
    batchFiles.value = Array.from(target.files)
    batchOutput.value = []
    error.value = ''
  }
}

function clearBatchFiles() {
  batchFiles.value = []
  batchOutput.value = []
}

function swapFormats() {
  const temp = fromFormat.value
  fromFormat.value = toFormat.value
  toFormat.value = temp
}

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) {
    inputFile.value = target.files[0]
    error.value = ''
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.files?.[0]) {
    inputFile.value = e.dataTransfer.files[0]
    error.value = ''
  }
}

async function convert() {
  if (!canConvert.value) return

  // Batch mode
  if (selectedFormat.value === 'batch') {
    await batchConvert()
    return
  }

  converting.value = true
  error.value = ''
  output.value = ''

  try {
    let data: any = null

    if (inputMode.value === 'file' && inputFile.value) {
      data = await readFile(inputFile.value)
    } else {
      data = inputText.value
    }

    if (selectedFormat.value === 'text') {
      output.value = convertText(data)
    } else {
      const jsonData = parseToJson(data)
      if (toFormat.value === 'JSON') {
        output.value = JSON.stringify(jsonData, null, 2)
      } else if (toFormat.value === 'CSV') {
        output.value = jsonToCsv(jsonData)
      } else if (toFormat.value === 'Excel') {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(jsonData)
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([wbout], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'converted.xlsx'
        a.click()
        URL.revokeObjectURL(url)
        converting.value = false
        return
      }
    }
  } catch (err: any) {
    error.value = err.message || 'Conversion failed. Please check your input format.'
  }

  converting.value = false
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

function parseToJson(data: string): any[] {
  if (data.trim().startsWith('[') || data.trim().startsWith('{')) {
    return JSON.parse(data)
  }
  const lines = data.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  const result: any[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
    const obj: any = {}
    headers.forEach((h, idx) => { obj[h] = values[idx] || '' })
    result.push(obj)
  }
  return result
}

function jsonToCsv(data: any[]): string {
  if (!data.length) return ''
  const headers = Object.keys(data[0])
  const csvRows = [headers.join(',')]
  for (const row of data) {
    csvRows.push(headers.map(h => `"${row[h] ?? ''}"`).join(','))
  }
  return csvRows.join('\n')
}

function convertText(text: string): string {
  switch (toFormat.value) {
    case 'Base64':
      return btoa(unescape(encodeURIComponent(text)))
    case 'URL Encode':
      return encodeURIComponent(text)
    case 'Plain Text':
    default:
      return text
  }
}

function copyOutput() {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function downloadOutput() {
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `converted.${toFormat.value.toLowerCase()}`
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
      const data = await readFile(file)
      const jsonData = parseToJson(data)
      let result: string
      let blob: Blob

      if (toFormat.value === 'JSON') {
        result = JSON.stringify(jsonData, null, 2)
        blob = new Blob([result], { type: 'application/json' })
      } else {
        result = jsonToCsv(jsonData)
        blob = new Blob([result], { type: 'text/csv' })
      }

      const outputName = file.name.replace(/\.[^.]+$/, '') + (toFormat.value === 'JSON' ? '.json' : '.csv')
      batchOutput.value.push({ name: outputName, blob, size: blob.size })
    }
  } catch (err: any) {
    error.value = err.message || 'Batch conversion failed. Please check your files.'
  }

  converting.value = false
}

async function downloadAllBatch() {
  if (!batchOutput.value.length) return

  // Simple approach: download files one by one (ZIP would require JSZip library)
  for (const item of batchOutput.value) {
    const url = URL.createObjectURL(item.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = item.name
    a.click()
    URL.revokeObjectURL(url)
    await new Promise(r => setTimeout(r, 200)) // Small delay between downloads
  }
}

// License system
function validateLicenseKey(key: string): boolean {
  // Format: CH-PRO-XXXX-XXXX-XXXX
  const pattern = /^CH-PRO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
  return pattern.test(key)
}

function activateLicense() {
  activationError.value = ''
  activationSuccess.value = ''

  const key = licenseKeyInput.value.trim().toUpperCase()

  if (!validateLicenseKey(key)) {
    activationError.value = 'Invalid license key format. Expected: CH-PRO-XXXX-XXXX-XXXX'
    return
  }

  // Store license
  localStorage.setItem('convertTools_license', key)
  isPro.value = true
  activationSuccess.value = 'Pro activated successfully!'
  licenseKeyInput.value = ''

  // Auto close after success
  setTimeout(() => {
    showUpgradeModal.value = false
    activationSuccess.value = ''
  }, 1500)
}

function deactivatePro() {
  if (confirm('Remove Pro license from this browser?')) {
    localStorage.removeItem('convertTools_license')
    isPro.value = false
    showUpgradeModal.value = false
  }
}

// Load license on mount
onMounted(() => {
  const stored = localStorage.getItem('convertTools_license')
  if (stored && validateLicenseKey(stored)) {
    isPro.value = true
  }
})
</script>
