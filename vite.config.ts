import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Bu satırı ekle (yoksa npm install @tailwindcss/vite)

export default defineConfig({
  plugins: [
    tailwindcss(), // React'ten önce gelmesi daha iyidir
    react(),
  ],
})