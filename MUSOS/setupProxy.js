const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://192.168.10.3:5000',
      changeOrigin: true,
      secure: false, // If using self-signed certificate
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {
        '^/api/process_frame': '/process_frame', // Specific rewrite rule
        '^/api': ''
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxy Request:', {
          method: req.method,
          path: req.path,
          targetUrl: proxyReq.path
        });
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Proxy Response:', {
          statusCode: proxyRes.statusCode,
          path: req.path
        });
      }
    })
  );
};