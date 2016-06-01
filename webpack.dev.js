// Webpack config
const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  // Use client as our root
  context: __dirname,
  // Entry file
  entry: [
    'webpack/hot/only-dev-server?http://localhost:8080/js/', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
    'webpack-hot-middleware/client',
    "./client/index.jsx"],
  // Resolve
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Output to /build
  output: {
    path: '/',
    publicPath: 'http://localhost:8080/js/',
    chunkFilename: '[name].chunk.js'
    },
  module: {
      loaders: [
        { test: /\.jsx$/, exclude: /node_modules/, loaders: [ "react-hot", "babel-loader"] }
      ]
    },
  // Plugins
  plugins: [
    // Hot reload
    new webpack.HotModuleReplacementPlugin()
    // HTML
    /*
    new HtmlWebpackPlugin({
      title: 'Bedel',
      filename: path.join(__dirname, 'views', 'index.ejs'),
      template: path.join(__dirname, 'client', 'templates', 'index.ejs'),
      inject: false
    })*/
  ]
};
