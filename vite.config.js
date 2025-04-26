import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, but just being explicit
  },
  server: {
    historyApiFallback: true, // for local dev
  },
})
