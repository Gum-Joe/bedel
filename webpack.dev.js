// Webpack config
const path = require('path');
const webpack = require('webpack');
module.exports = {

  // Use client as our root
  context: __dirname + "/app",
  // Entry file
  entry: [
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
    "./index"],
  // Output to /build
  output: {
        path: path.join(__dirname, "build", "js"),
        filename: "bundle.js",
        chunkFilename: '[name].chunk.js'
    },
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
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
