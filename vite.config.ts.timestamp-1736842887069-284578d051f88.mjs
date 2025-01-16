// vite.config.ts
import { defineConfig } from 'file:///Users/saul/work/unielon-wallet-react/node_modules/vite/dist/node/index.js'
import react from 'file:///Users/saul/work/unielon-wallet-react/node_modules/@vitejs/plugin-react/dist/index.mjs'
import dts from 'file:///Users/saul/work/unielon-wallet-react/node_modules/vite-plugin-dts/dist/index.mjs'
var vite_config_default = defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: '@unielon/wallet-connect-react',
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2F1bC93b3JrL3VuaWVsb24td2FsbGV0LXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2F1bC93b3JrL3VuaWVsb24td2FsbGV0LXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zYXVsL3dvcmsvdW5pZWxvbi13YWxsZXQtcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgZHRzKCldLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6ICdzcmMvbGliL2luZGV4LnRzJyxcbiAgICAgIG5hbWU6ICdAdW5pZWxvbi93YWxsZXQtY29ubmVjdC1yZWFjdCcsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCwgZW50cnlOYW1lKSA9PiAoZm9ybWF0ID09PSAnZXMnID8gYCR7ZW50cnlOYW1lfS5qc2AgOiBgJHtlbnRyeU5hbWV9LiR7Zm9ybWF0fS5qc2ApLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAvXnJlYWN0XFwvLiovLCAncmVhY3QtZG9tJywgL3JlYWN0LWRvbVxcLy4qLywgJ3JlYWN0L2pzeC1ydW50aW1lJywgJ2JpZ251bWJlci5qcyddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsb0JBQW9CO0FBQzlULE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFHaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFBQSxFQUN4QixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsUUFBUSxjQUFlLFdBQVcsT0FBTyxHQUFHLFNBQVMsUUFBUSxHQUFHLFNBQVMsSUFBSSxNQUFNO0FBQUEsSUFDaEc7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGNBQWMsYUFBYSxpQkFBaUIscUJBQXFCLGNBQWM7QUFBQSxNQUNuRyxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
