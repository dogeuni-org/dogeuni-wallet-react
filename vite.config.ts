import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: '@dogeuni-org/wallet-connect-react',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => (format === 'es' ? `${entryName}.js` : `${entryName}.${format}.js`),
    },
    rollupOptions: {
      external: ['react', /^react\/.*/, 'react-dom', /react-dom\/.*/, 'react/jsx-runtime', 'bignumber.js'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
