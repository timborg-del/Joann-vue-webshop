import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    sourcemap: true, // Ensure source maps are enabled
    outDir: 'dist',  // Specify the output directory
    rollupOptions: {
      output: {
        sourcemap: true, // Ensure source maps are enabled for Rollup
      },
    },
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
});
