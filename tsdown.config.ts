import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  external: ['react', 'react-dom', '@tanstack/react-router'],
  // ...config options
})
