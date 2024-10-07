/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm()],
  define:{
    'process.env.LCAX_VERSION': JSON.stringify(packageJson.dependencies.lcax || 'unknown'),
  },
  optimizeDeps: {
    exclude: ['node_modules/.cache'],
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
