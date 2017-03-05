// Webpack config
const webpack = require('webpack');
const { config, rawLoaders, loadersToArray } = require('./webpack.config.default.js');
// Apply our changes
const newLoaders = Object.assign({}, rawLoaders);

// Export
module.exports = Object.assign(config, {

  entry: [
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
    'webpack-hot-middleware/client',
    ...config.entry
  ],

  output: {
    path: '/',
    publicPath: 'http://localhost:8080/js/',
    chunkFilename: '[name].chunk.js',
    filename: "bundle.js"
  },

  module: {
    loaders: loadersToArray(newLoaders)
  },

  plugins: Array.prototype.concat(config.plugins,
    [
      // Hot reload
      new webpack.HotModuleReplacementPlugin()
    ]
  )

});
