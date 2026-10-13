import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // the site is served from the root of mikhilwankhede.com
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build', // `npm run deploy` publishes this folder to GitHub Pages
    emptyOutDir: true,
  },
  // Used by `npm test` (Vitest)
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
