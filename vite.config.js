import alpineIncludePlugin from './plugins/vite-plugin-alpine-include.js';

export default {
  build: {
    modulePreload: true,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['alpinejs'],
        },
        generatedCode: {
          symbols: false
        }
      },
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: false,
        tryCatchDefer: false
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['alpinejs'],
    force: true,
    entries: [
      './index.html'
    ]
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    alpineIncludePlugin(),
  ],
}