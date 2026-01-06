import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  server: {
    allowedHosts: true,
    port: 4004
  },
  build: {
    sourcemap: false,          // 🔥 énorme gain mémoire
    minify: 'esbuild',         // plus léger que terser
    target: 'es2020',
    chunkSizeWarningLimit: 1000, // Augmente la limite avant warning
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare les gros vendors pour éviter les chunks trop lourds
          'react-vendor': ['react', 'react-dom'],
          'web3-vendor': ['@getpara/react-sdk', '@zyfai/sdk'],
        },
      },
    },
  },
})