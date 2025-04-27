import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{ts,js}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  }
})