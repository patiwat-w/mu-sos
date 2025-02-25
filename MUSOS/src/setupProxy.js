const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      proxy: {
        '/ai-service': {
          target: 'https://msu-triage.egmu-research.org/service/proxy.ashx?http://192.168.10.3:5000',
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
          target: process.env.NODE_ENV === 'production' 
            ? 'https://msu-triage.egmu-research.org/api'
            : 'http://localhost:5295',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Add content-type if missing
              if (!proxyReq.getHeader('content-type')) {
                proxyReq.setHeader('content-type', 'application/json');
              }
              console.log('Proxying request:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Response:', proxyRes.statusCode, req.method, req.url);
            });
            proxy.on('error', (err, req, res) => {
              console.error('Proxy error:', err);
            });
          }
        }
      }
    })
  );
};
