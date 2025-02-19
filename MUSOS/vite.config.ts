/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

// Polyfill for process.cwd
if (typeof process.cwd !== 'function') {
  process.cwd = () => '/';
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupProxy.js',
  },
  server: {
    proxy: {
      '/ai-service': {
        target: 'https://msu-triage.egmu-research.org/service/proxy.ashx?http://192.168.10.3:5000', //https://msu-triage.egmu-research.org/service/proxy.ashx?
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const newPath = path.replace(/^\/ai-service/, '');
          console.log('Rewriting path:', path, '->', newPath);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response from target:', proxyRes.statusCode);
          });
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
          });
        }
      },
      '/api': {
        target: 'http://localhost:5295',  //https://msu-triage.egmu-research.org/api
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '');
          console.log('Rewriting path:', path, '->', newPath);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response from target:', proxyRes.statusCode);
          });
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
          });
        }
      }
    },
    host: true,
    port: 5173
  },
  define: {
    'process.env': process.env,
  },
})
