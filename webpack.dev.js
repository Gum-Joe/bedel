// Webpack config
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  // Use client as our root
  context: __dirname + "/client",
  // Entry file
  entry: [
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
    'webpack-hot-middleware/client',
    "./index"],
  // Output to /build
  output: {
    path: '/',
    publicPath: 'http://localhost:3000/js/',
    chunkFilename: '[name].chunk.js'
    },
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: [ "react-hot", "babel-loader" ] },
    { test: /\.jsx$/, exclude: /node_modules/, loader: [ "react-hot", "babel-loader" ] },
    { test: /\.scss$/, loaders: ["style", "css", "sass"] }
  ],
  // Plugins
  plugins: [
    // Hot reload
    new webpack.HotModuleReplacementPlugin(),
    // HTML
    new HtmlWebpackPlugin({
      title: 'Bedel',
      filename: path.join(__dirname, 'views', 'index.html'),
      inject: true
    })
  ]
};
