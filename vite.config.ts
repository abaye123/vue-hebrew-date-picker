import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
    }),
    {
      name: 'copy-style',
      closeBundle() {
        const fs = require('fs')
        fs.copyFileSync(
          resolve(__dirname, 'src/style.css'),
          resolve(__dirname, 'dist/style.css')
        )
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueHebrewDatePicker',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'jewish-date', 'dayjs'],
      output: {
        globals: {
          vue: 'Vue',
          'jewish-date': 'JewishDate',
          dayjs: 'dayjs'
        },
        exports: 'named'
      }
    }
  }
})
