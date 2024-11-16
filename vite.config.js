import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		react(),
		compression({ algorithm: 'gzip' }), // Ativando compressão com Gzip
	],

	base: './', // Certifique-se de que o base está correto para seu ambiente de deploy

	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Divisão automática de chunks para pacotes grandes
					if (id.includes('node_modules')) {
						return id
							.toString()
							.split('node_modules/')[1]
							.split('/')[0]
							.toString();
					}
				},
			},
		},
		terserOptions: {
			compress: {
				drop_console: true, // Remove console.logs
				drop_debugger: true, // Remove debuggers
			},
		},
		chunkSizeWarningLimit: 1000, // Tamanho máximo do chunk antes de alertar
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // Alias para melhorar importações
		},
	},

	server: {
		open: true, // Abrir automaticamente no navegador
		port: 5173, // Porta padrão do Vite
	},
});
