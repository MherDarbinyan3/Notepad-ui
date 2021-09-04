import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig,  } from 'vite';

export default defineConfig({
  optimizeDeps: {
  },
  plugins: [
    reactRefresh(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    }
  }
})
