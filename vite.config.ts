import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite'
import path from 'path';


export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
       
    ],

    esbuild: {
        loader: 'tsx', // ensure TSX files are supported
         jsx: 'automatic',
    },
    resolve: {
        alias: {
              '@': path.resolve(__dirname, 'resources/js'),
              'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            
        },
    },
    server: {
        host: 'localhost',
        port: 5173,
        hmr: {
            host: 'localhost',
        },
    },
});



