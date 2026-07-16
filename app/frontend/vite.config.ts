import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          configure(proxy) {
            proxy.on('error', (error, request) => {
              console.error(
                `[vite proxy] ${request.method} ${request.url} falhou antes de chegar na API: ${error.message}`,
              );
            });

            proxy.on('proxyRes', (proxyResponse, request) => {
              const statusCode = proxyResponse.statusCode ?? 0;

              if (statusCode >= 400) {
                console.error(
                  `[vite proxy] ${request.method} ${request.url} retornou status ${statusCode}`,
                );
              }
            });
          },
        },
      },
    },
  };
});
