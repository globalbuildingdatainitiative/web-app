/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm()],
  optimizeDeps: {
    exclude: [
      'chunk-YSDLPTTY.js',
      'chunk-XBHG3ID7.js',
      'chunk-AVL2GBNE.js'
    ]
  },
  esbuild: {
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'src/vitest.setup.ts', // Add the setup file here
    snapshotSerializers: ['src/__test__/snapshotSerializer.ts'],
    alias: {
      'lcax': `${__dirname}/src/__mocks__/lcax.ts`,
    },
  },
})
