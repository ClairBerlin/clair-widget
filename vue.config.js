module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://clair.jawebada.de',
        changeOrigin: true
      }
    }
  }
}
