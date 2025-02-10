import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: true, // if you want Vite's dev server to run on HTTPS
    proxy: {
      '/api': {  // Change to '/api' so all API calls are forwarded
        target: 'http://localhost:4092',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})