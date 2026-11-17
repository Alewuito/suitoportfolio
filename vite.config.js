import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import llms from './scripts/llms.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), llms()],
  server: { port: 6180, strictPort: true },
  preview: { port: 6180, strictPort: true },
})
