import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import globals from 'globals'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },

  test:{
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    globals: true
  }
})
