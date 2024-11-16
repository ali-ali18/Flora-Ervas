import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Substitua por './' se o app não está no root (ex.: para Netlify)
});
