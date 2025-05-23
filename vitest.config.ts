import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/main',
        'src/presentation/components/ui',
        'src/presentation/test',
        'src/stories',
        '**/index.ts',
        '.storybook',
        'eslint.config.js',
        'vite.config.ts',
        'vitest.config.ts',
      ]
    },
  },
})