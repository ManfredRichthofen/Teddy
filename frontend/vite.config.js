import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0'
  },
  server: {
    https: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:4092',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})