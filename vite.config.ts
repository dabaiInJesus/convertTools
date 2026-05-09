import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/convertTools/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          xlsx: ['xlsx'],
          jszip: ['jszip']
        }
      }
    }
  }
})
