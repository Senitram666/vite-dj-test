import alpineIncludePlugin from './plugins/vite-plugin-alpine-include.js';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      modulePreload: true,
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['alpinejs'],
          },
          generatedCode: {
            symbols: false,
          },
        },
        treeshake: {
          moduleSideEffects: true,
          propertyReadSideEffects: false,
          tryCatchDefer: false,
        },
      },
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
    },
    optimizeDeps: {
      include: ['alpinejs'],
      force: true,
      entries: [
        './index.html'
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      hmr: {
        overlay: false
      }
    },
    plugins: [alpineIncludePlugin()],
  };
});