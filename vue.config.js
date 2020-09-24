module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://ulrichs-mbp.wxwjofiljqw2iqlh.myfritz.net:5000',
        changeOrigin: false
      },
      '^/audio': {
        target: 'http://localhost:5000',
        changeOrigin: false
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
