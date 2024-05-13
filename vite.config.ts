/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm()],
  test: {
    globals: true,
    environment: 'happy-dom',
    snapshotSerializers: ['src/__test__/snapshotSerializer.ts'],
    alias: {
      'lcax': `${__dirname}/src/__mocks__/lcax.ts`,
    }
  },
})
