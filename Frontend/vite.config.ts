import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5174', // The backend server URL
        changeOrigin: true,             // Change the origin of the request (i.e. coming from 5174 instead of 5173)
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite path if needed
      }
    }
  }
})

