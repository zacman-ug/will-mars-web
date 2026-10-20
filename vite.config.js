import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5181',
        changeOrigin: true,
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/images/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        next();
      });
    },
  },
  preview: {
    port: 5180,
    strictPort: true,
  },
})
