
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-backend-237430.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  preview: {
    proxy: {
      '/api': {
        target: 'https://mern-backend-237430.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
