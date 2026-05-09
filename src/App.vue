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
          <span v-if="isPro" class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">PRO</span>
        </div>
        <div class="flex items-center gap-4">
          <button @click="showHistory = !showHistory" class="text-gray-500 hover:text-gray-700 text-sm">{{ t('header.history') }}</button>
          <!-- Language Switcher -->
          <div class="relative">
            <button @click="showLangMenu = !showLangMenu" class="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
              <span>{{ currentLocale === 'zh-CN' ? '🇨🇳 中文' : '🇺🇸 EN' }}</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="showLangMenu" class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                v-for="lang in supportedLocales"
                :key="lang.code"
                @click="switchLanguage(lang.code)"
                class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition"
                :class="currentLocale === lang.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
          <a href="https://github.com/dabaiInJesus" target="_blank" class="text-gray-500 hover:text-gray-700 text-sm">{{ t('header.github') }}</a>
          <button @click="showUpgradeModal = true" class="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition shadow-md">
            {{ t('header.support') }}
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

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- History Sidebar -->
        <div v-if="showHistory" class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-4 sticky top-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900">Recent Conversions</h3>
              <button @click="clearHistory" class="text-xs text-gray-500 hover:text-gray-700">Clear</button>
            </div>
            <div v-if="history.length === 0" class="text-center py-8 text-gray-400 text-sm">
              No history yet
            </div>
            <div v-else class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="(item, idx) in history" :key="idx" 
                   class="p-3 bg-gray-50 rounded-lg text-sm cursor-pointer hover:bg-gray-100 transition"
                   @click="loadFromHistory(item)">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-medium text-gray-700">{{ item.from }} → {{ item.to }}</span>
                  <span class="text-xs text-gray-400">{{ formatTime(item.timestamp) }}</span>
                </div>
                <div class="text-xs text-gray-500 truncate">{{ item.fileName || 'Text input' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Converter Card -->
        <div :class="showHistory ? 'lg:col-span-3' : 'lg:col-span-4'">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Format Selector -->
            <div class="bg-gray-50 border-b border-gray-200 p-4">
              <div class="flex items-center justify-center gap-3 flex-wrap">
                <button
                  v-for="fmt in formats"
                  :key="fmt.id"
                  @click="selectFormat(fmt.id)"
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
              <div v-if="selectedFormat !== 'text'" class="flex items-center justify-center gap-4 mb-4">
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
                  <p class="text-amber-800 font-semibold mb-2">Batch Convert {{ isPro ? '(Pro)' : '' }}</p>
                  <p class="text-amber-600 text-sm mb-4">Convert multiple files at once with same output format</p>
                  <input ref="batchFileInput" type="file" multiple class="hidden" @change="handleBatchFiles" accept=".csv,.xlsx,.xls,.json,.txt,.xml" />
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
              <div v-else-if="selectedFormat !== 'text'" class="mb-6">
                <!-- Size Warning -->
                <div v-if="currentDataSize > dataSizeLimit && !isPro" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                  ⚠️ File size exceeds {{ formatSize(dataSizeLimit) }} limit. Upgrade to Pro for files up to {{ formatSize(proDataSizeLimit) }}.
                </div>

                <div v-if="inputMode === 'file'" 
                     class="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-400 transition cursor-pointer" 
                     @click="$refs.fileInput.click()" 
                     @dragover.prevent 
                     @drop.prevent="handleDrop">
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

              <!-- Text Tools Input -->
              <div v-if="selectedFormat === 'text'" class="mb-6">
                <textarea
                  v-model="inputText"
                  class="w-full h-48 p-4 border border-gray-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter your text here..."
                ></textarea>
                <p class="text-xs text-gray-400 mt-1 text-right">{{ formatSize(currentDataSize) }}</p>
              </div>

              <!-- Progress Bar -->
              <div v-if="converting && conversionProgress > 0" class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Converting...</span>
                  <span class="text-sm text-gray-600">{{ conversionProgress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-indigo-600 h-2 rounded-full transition-all duration-300" :style="{ width: conversionProgress + '%' }"></div>
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
                  :disabled="!canConvert || converting || (currentDataSize > dataSizeLimit && !isPro)"
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

              <!-- Success Message -->
              <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                ✅ {{ successMessage }}
              </div>

              <!-- Output Area -->
              <div v-if="output" class="bg-gray-900 rounded-xl p-4 relative">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-400 text-sm font-medium">Output ({{ toFormat.toUpperCase() }})</span>
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
import JSZip from 'jszip'
import { t, initLocale, getLocale, setLocale, getSupportedLocales, type Locale } from './locales'

// Types
interface HistoryItem {
  from: string
  to: string
  fileName?: string
  timestamp: number
  data?: string
}

// Language
const currentLocale = ref<Locale>(initLocale())
const showLangMenu = ref(false)
const supportedLocales = getSupportedLocales()

function switchLanguage(locale: Locale) {
  setLocale(locale)
  currentLocale.value = locale
  showLangMenu.value = false
}

// Close language menu when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showLangMenu.value = false
    }
  })
}

const formats = computed(() => [
  { id: 'csv-json', label: t('formats.csvJson') },
  { id: 'excel-json', label: t('formats.excelJson') },
  { id: 'csv-excel', label: t('formats.csvExcel') },
  { id: 'json-xml', label: t('formats.jsonXml') },
  { id: 'text', label: t('formats.text') },
  { id: 'batch', label: t('formats.batch') },
])

const selectedFormat = ref('csv-json')
const inputMode = ref<'file' | 'text'>('file')
const inputFile = ref<File | null>(null)
const inputText = ref('')
const fromFormat = ref('CSV')
const toFormat = ref('JSON')
const output = ref('')
const error = ref('')
const successMessage = ref('')
const converting = ref(false)
const copied = ref(false)
const conversionProgress = ref(0)
const showHistory = ref(false)
const history = ref<HistoryItem[]>([])

// Pro system
const isPro = ref(false)
const showUpgradeModal = ref(false)
const licenseKeyInput = ref('')
const activationError = ref('')
const activationSuccess = ref('')
const dataSizeLimit = ref(5 * 1024 * 1024) // 5MB for free tier
const proDataSizeLimit = ref(50 * 1024 * 1024) // 50MB for pro

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
    case 'json-xml': return ['JSON', 'XML']
    case 'text': return [
      t('textTools.base64Encode'),
      t('textTools.base64Decode'),
      t('textTools.urlEncode'),
      t('textTools.urlDecode'),
      t('textTools.plainText')
    ]
    case 'batch': return ['JSON', 'CSV', 'Excel']
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
    case 'json-xml':
      return '.json,.xml'
    default:
      return '*'
  }
})

const canConvert = computed(() => {
  if (selectedFormat.value === 'batch') return batchFiles.value.length > 0
  if (selectedFormat.value === 'text') return inputText.value.trim().length > 0
  if (inputMode.value === 'file') return !!inputFile.value
  return inputText.value.trim().length > 0
})

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return t('time.justNow')
  if (diff < 3600000) return t('time.minutesAgo', { m: Math.floor(diff / 60000) })
  if (diff < 86400000) return t('time.hoursAgo', { h: Math.floor(diff / 3600000) })
  return date.toLocaleDateString(currentLocale.value === 'zh-CN' ? 'zh-CN' : 'en-US')
}

function selectFormat(formatId: string) {
  selectedFormat.value = formatId
  // Reset formats based on selection
  switch (formatId) {
    case 'csv-json':
      fromFormat.value = 'CSV'
      toFormat.value = 'JSON'
      break
    case 'excel-json':
      fromFormat.value = 'Excel'
      toFormat.value = 'JSON'
      break
    case 'csv-excel':
      fromFormat.value = 'CSV'
      toFormat.value = 'Excel'
      break
    case 'json-xml':
      fromFormat.value = 'JSON'
      toFormat.value = 'XML'
      break
    case 'text':
      fromFormat.value = 'Plain Text'
      toFormat.value = 'Base64 Encode'
      break
    case 'batch':
      toFormat.value = 'JSON'
      break
  }
  resetConversion()
}

function resetConversion() {
  inputFile.value = null
  inputText.value = ''
  output.value = ''
  error.value = ''
  successMessage.value = ''
  conversionProgress.value = 0
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
  
  // Check size limit
  if (currentDataSize.value > dataSizeLimit.value && !isPro.value) {
    error.value = `File size exceeds ${formatSize(dataSizeLimit.value)} limit. Upgrade to Pro for larger files.`
    return
  }

  // Batch mode
  if (selectedFormat.value === 'batch') {
    await batchConvert()
    return
  }

  converting.value = true
  error.value = ''
  successMessage.value = ''
  output.value = ''
  conversionProgress.value = 10

  try {
    let data: any = null

    if (selectedFormat.value === 'text') {
      data = inputText.value
    } else if (inputMode.value === 'file' && inputFile.value) {
      conversionProgress.value = 30
      data = await readFile(inputFile.value)
      conversionProgress.value = 60
    } else {
      data = inputText.value
    }

    conversionProgress.value = 70

    if (selectedFormat.value === 'text') {
      output.value = convertText(data)
      conversionProgress.value = 100
    } else {
      const jsonData = parseToJson(data)
      conversionProgress.value = 80
      
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
        successMessage.value = t('messages.downloaded')
        addToHistory('Converted', 'Excel', inputFile.value?.name)
        converting.value = false
        conversionProgress.value = 100
        return
      } else if (toFormat.value === 'XML') {
        output.value = jsonToXml(jsonData)
      }
      
      conversionProgress.value = 100
      successMessage.value = t('messages.converted')
      
      // Add to history
      addToHistory(fromFormat.value, toFormat.value, inputFile.value?.name)
    }
  } catch (err: any) {
    error.value = err.message || t('errors.conversionFailed')
    conversionProgress.value = 0
  }

  converting.value = false
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    // Handle Excel files
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
          
          // Convert to array of objects
          if (jsonData.length > 0) {
            const headers = jsonData[0]
            const result = jsonData.slice(1).map((row: any) => {
              const obj: any = {}
              headers.forEach((header: string, idx: number) => {
                obj[header] = row[idx] || ''
              })
              return obj
            })
            resolve(JSON.stringify(result))
          } else {
            resolve('[]')
          }
        } catch (err) {
          reject(new Error(t('errors.invalidExcel')))
        }
      }
      reader.onerror = () => reject(new Error(t('errors.readFailed')))
      reader.readAsArrayBuffer(file)
    } else {
      // Handle text-based files
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    }
  })
}

function parseToJson(data: string): any[] {
  // Try parsing as JSON first
  try {
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch {}

  // Try parsing as XML
  if (data.trim().startsWith('<')) {
    return xmlToJson(data)
  }

  // Parse as CSV
  const lines = data.trim().split('\n').filter(line => line.trim())
  if (lines.length < 2) {
    throw new Error(t('errors.invalidCsv'))
  }
  
  const headers = parseCsvLine(lines[0])
  const result: any[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    const obj: any = {}
    headers.forEach((h, idx) => { 
      obj[h] = values[idx] !== undefined ? values[idx] : '' 
    })
    result.push(obj)
  }
  
  return result
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

function jsonToCsv(data: any[]): string {
  if (!data.length) return ''
  const headers = Object.keys(data[0])
  const csvRows = [headers.map(h => escapeCsvField(h)).join(',')]
  
  for (const row of data) {
    csvRows.push(headers.map(h => escapeCsvField(row[h] ?? '')).join(','))
  }
  
  return csvRows.join('\n')
}

function escapeCsvField(field: any): string {
  const str = String(field)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

function jsonToXml(data: any[], rootName: string = 'root'): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += `<${rootName}>\n`
  
  data.forEach((item, idx) => {
    xml += `  <item>\n`
    for (const [key, value] of Object.entries(item)) {
      xml += `    <${key}>${escapeXml(String(value))}</${key}>\n`
    }
    xml += `  </item>\n`
  })
  
  xml += `</${rootName}>`
  return xml
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function xmlToJson(xml: string): any[] {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml')
  
  // Check for parsing errors
  const errorNode = xmlDoc.querySelector('parsererror')
  if (errorNode) {
    throw new Error(t('errors.invalidXml'))
  }
  
  const root = xmlDoc.documentElement
  const items = root.querySelectorAll('item')
  
  if (items.length === 0) {
    // Try to convert single object
    const obj: any = {}
    Array.from(root.children).forEach(child => {
      obj[child.tagName] = child.textContent || ''
    })
    return [obj]
  }
  
  const result: any[] = []
  items.forEach(item => {
    const obj: any = {}
    Array.from(item.children).forEach(child => {
      obj[child.tagName] = child.textContent || ''
    })
    result.push(obj)
  })
  
  return result
}

function convertText(text: string): string {
  switch (toFormat.value) {
    case t('textTools.base64Encode'):
      return btoa(unescape(encodeURIComponent(text)))
    case t('textTools.base64Decode'):
      try {
        return decodeURIComponent(escape(atob(text)))
      } catch {
        throw new Error(t('errors.invalidBase64'))
      }
    case t('textTools.urlEncode'):
      return encodeURIComponent(text)
    case t('textTools.urlDecode'):
      try {
        return decodeURIComponent(text)
      } catch {
        throw new Error(t('errors.invalidUrl'))
      }
    case t('textTools.plainText'):
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
  const ext = toFormat.value.toLowerCase().replace(/\s+/g, '-')
  const blob = new Blob([output.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `converted.${ext}`
  a.click()
  URL.revokeObjectURL(url)
}

// Batch conversion
async function batchConvert() {
  if (!batchFiles.value.length) return

  converting.value = true
  error.value = ''
  successMessage.value = ''
  batchOutput.value = []
  conversionProgress.value = 0

  try {
    const total = batchFiles.value.length
    
    for (let i = 0; i < total; i++) {
      const file = batchFiles.value[i]
      const data = await readFile(file)
      const jsonData = parseToJson(data)
      let result: string
      let blob: Blob

      if (toFormat.value === 'JSON') {
        result = JSON.stringify(jsonData, null, 2)
        blob = new Blob([result], { type: 'application/json' })
      } else if (toFormat.value === 'CSV') {
        result = jsonToCsv(jsonData)
        blob = new Blob([result], { type: 'text/csv' })
      } else if (toFormat.value === 'Excel') {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(jsonData)
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        blob = new Blob([wbout], { type: 'application/octet-stream' })
      } else {
        throw new Error(t('errors.unsupportedFormat', { format: toFormat.value }))
      }

      const outputName = file.name.replace(/\.[^.]+$/, '') + 
        (toFormat.value === 'JSON' ? '.json' : toFormat.value === 'CSV' ? '.csv' : '.xlsx')
      batchOutput.value.push({ name: outputName, blob, size: blob.size })
      
      conversionProgress.value = Math.round(((i + 1) / total) * 100)
    }

    successMessage.value = t('messages.success', { count: total })
  } catch (err: any) {
    error.value = err.message || t('errors.batchFailed')
    conversionProgress.value = 0
  }

  converting.value = false
}

async function downloadAllBatch() {
  if (!batchOutput.value.length) return

  try {
    const zip = new JSZip()
    
    batchOutput.value.forEach(item => {
      zip.file(item.name, item.blob)
    })

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-files.zip'
    a.click()
    URL.revokeObjectURL(url)
    
    successMessage.value = t('messages.zipDownloaded')
  } catch (err: any) {
    error.value = t('errors.zipFailed') + err.message
  }
}

// History management
function addToHistory(from: string, to: string, fileName?: string) {
  const item: HistoryItem = {
    from,
    to,
    fileName,
    timestamp: Date.now(),
    data: output.value
  }
  
  history.value.unshift(item)
  
  // Keep only last 20 items
  if (history.value.length > 20) {
    history.value = history.value.slice(0, 20)
  }
  
  // Save to localStorage
  localStorage.setItem('convertTools_history', JSON.stringify(history.value))
}

function loadFromHistory(item: HistoryItem) {
  if (item.data) {
    output.value = item.data
    fromFormat.value = item.from
    toFormat.value = item.to
    successMessage.value = t('messages.loaded')
  }
}

function clearHistory() {
  if (confirm(t('history.confirmClear'))) {
    history.value = []
    localStorage.removeItem('convertTools_history')
  }
}

function loadHistory() {
  const stored = localStorage.getItem('convertTools_history')
  if (stored) {
    try {
      history.value = JSON.parse(stored)
    } catch {}
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
    activationError.value = t('activation.invalidFormat')
    return
  }

  // Store license
  localStorage.setItem('convertTools_license', key)
  isPro.value = true
  activationSuccess.value = t('activation.success')
  licenseKeyInput.value = ''

  // Auto close after success
  setTimeout(() => {
    showUpgradeModal.value = false
    activationSuccess.value = ''
  }, 2000)
}

function deactivatePro() {
  if (confirm(t('upgrade.confirmRemove'))) {
    localStorage.removeItem('convertTools_license')
    isPro.value = false
    showUpgradeModal.value = false
  }
}

// Load license and history on mount
onMounted(() => {
  const stored = localStorage.getItem('convertTools_license')
  if (stored && validateLicenseKey(stored)) {
    isPro.value = true
  }
  loadHistory()
})
</script>
