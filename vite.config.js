import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: path.resolve(__dirname, 'src'), // Set the root directory to src
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:math';`
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'root/*', 
          dest: '.'                   
        },
        {
          src: 'svgs/*',  
          dest: 'svgs'               
        },
        {
          src: 'favicon/*',
          dest: 'favicon'
        },
        {
          src: 'scripts/*',
          dest: 'scripts'
        },
        {
          src: 'docs/*',  
          dest: 'docs'               
        },
        {
          src: 'locales/*',  
          dest: 'locales'               
        },
        {
          src: 'tools/*', 
          dest: 'tools'               
        }
      ]
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Ensure output is in dist folder
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',    // Set the main JS file name
        chunkFileNames: '[name].js',  // For chunks
        assetFileNames: (assetInfo) => {
          // Move CSS to root and use a specific name
          if (assetInfo.name.endsWith('.css')) {
            return 'styles.css';       // Set CSS file name
          }
          return assetInfo.name;       // Keep other assets with their names
        },
      },
    },
  },
});
