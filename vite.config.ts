import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mime from 'mime';
import type { Connect } from 'vite';

// Define MIME types for TypeScript files
const setMimeType: Connect.NextHandleFunction = (req, res, next) => {
  if (req.url?.endsWith('.ts')) {
    res.setHeader('Content-Type', mime.getType('ts') || 'application/javascript');
  }
  if (req.url?.endsWith('.tsx')) {
    res.setHeader('Content-Type', mime.getType('tsx') || 'application/javascript');
  }
  next();
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use(setMimeType);
      }
    }
  ]
});
