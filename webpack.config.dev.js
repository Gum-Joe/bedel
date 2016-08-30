// Webpack config
const webpack = require('webpack');
const { config, rawLoaders, loadersToArray } = require('./webpack.config.default.js');
// Apply our changes
const newLoaders = Object.assign({}, rawLoaders);
newLoaders.js.loaders.unshift('react-hot');
newLoaders.jsx.loaders.unshift('react-hot');

// Export
module.exports = Object.assign(config, {

  entry: [
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
    'webpack-hot-middleware/client',
    "./client/index.jsx"
  ],

  module: Object.assign(config.module, {
    loaders: loadersToArray(newLoaders)
  }),

  plugins: Array.concat(config.plugins,
    [
      // Hot reload
      new webpack.HotModuleReplacementPlugin()
    ]
  )

});
