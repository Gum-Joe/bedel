// Webpack config
const path = require('path');
const webpack = require('webpack');
module.exports = {

  // Use client as our root
  context: __dirname + "/app",
  // Entry file
  entry: "./index",
  // Output to /build
  output: {
        path: path.join(__dirname, "views", "js"),
        filename: "bundle.js"
    },
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
    { test: /\.scss$/, loaders: ["style", "css", "sass"] }
  ]
};
