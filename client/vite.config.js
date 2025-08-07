import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [react(),
    visualizer({
      open: true, 
      gzipSize: true,
      brotliSize: true,
    }),
    tailwindcss()
  ],
})
