module.exports = {
  publicPath: './',
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: { proxy: 'http://localhost:8080' }
}

