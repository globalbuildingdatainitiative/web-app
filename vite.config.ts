/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import wasm from 'vite-plugin-wasm'
import packageJson from './package.json'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    wasm(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          // process.env.NODE_ENV === 'production' → import.meta.env.PROD === true
          // process.env.NODE_ENV === 'development' → import.meta.env.DEV === true
          injectScript:
            process.env.NODE_ENV === 'production' ? '<script type="module" src="%BASE_URL%injectEnv.js"></script>' : '',
        },
      },
    }),
  ],
  define: {
    'process.env.LCAX_VERSION': JSON.stringify(packageJson.dependencies.lcax || 'unknown'),
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
      lcax: `${__dirname}/src/__mocks__/lcax.ts`,
    },
  },
})
