const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  console.log('Something something proxy being useed')
  app.use(
    '/.netlify/functions/',
    createProxyMiddleware({
      target: 'http://localhost:9000/',
      changeOrigin: true,
    }),
  )
}
