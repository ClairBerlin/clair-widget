module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://clair-ev.de',
        changeOrigin: true
      }
    }
  }
}
