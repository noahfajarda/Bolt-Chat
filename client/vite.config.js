import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const routeConfig = {
  target: 'http://localhost:3001',
  changeOrigin: true,
  secure: false,
  ws: true
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/signup': routeConfig,
      '/auth/login': routeConfig,
    }
  }
})
