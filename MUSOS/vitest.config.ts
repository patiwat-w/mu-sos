import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts', './src/dynamicImports.ts'],
  },
  build: {
    chunkSizeWarningLimit: 500, // Set the chunk size warning limit to 500 kB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux'], // Add more libraries to vendor chunk
          ui: ['@mui/material', '@mui/icons-material'], // Example: create a separate chunk for UI libraries
        },
      },
    },
  },
});
