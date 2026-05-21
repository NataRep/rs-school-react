import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/rs-school-react/',
  server: {
    proxy: {
      "/api": {
        target: "https://swapi.dev/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/theme-dark.scss" as *;
          @use "@/styles/theme-light.scss" as *;
          @use "@/styles/mixins.scss" as *;`
      },
    },
  },
});