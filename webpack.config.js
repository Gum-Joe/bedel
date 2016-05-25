// Webpack config
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  // Use client as our root
  context: __dirname + "/client",
  // Entry file
  entry: "./index.jsx",
  // Resolve
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // Output to /build
  output: {
        path: path.join(__dirname, "build", "js"),
        filename: "bundle.js"
    },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  // Plugins
  plugins: [
    // HTML
    new HtmlWebpackPlugin({
      title: 'Bedel',
      filename: path.join(__dirname, 'views', 'index.ejs'),
      template: path.join(__dirname, 'client', 'templates', 'index.ejs')
    })
  ]
};
