// Webpack config
const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  // Use client as our root
  context: __dirname,
  // Entry file
  entry: [ "./client/index.jsx"],
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
        { test: /\.json$/, exclude: /node_modules/, loaders: [ "json-loader" ] },
        { test: /\.jsx$/, exclude: /node_modules/, loaders: [ "react-hot", "babel-loader"] },
        { test: /\.js$/, exclude: /node_modules/, loaders: [ "react-hot", "babel-loader"] },
        { test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"] },
        { test: /\.css$/, exclude: /node_modules/, loaders: ["style", "css"] },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        }
      ]
    },
  // Plugins
  plugins: [
    new webpack.optimize.DedupePlugin()
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
