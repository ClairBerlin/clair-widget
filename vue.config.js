module.exports = {
  publicPath: '/widget/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        // target: 'https://clair-ev.de',
        // changeOrigin: true
      }
    }
  }
}
