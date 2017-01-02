// Default webpack config
const path = require('path');
const webpack = require('webpack');

// Raw loaders
// For easier customization
const rawLoaders = {
  json: { test: /\.json$/, exclude: /node_modules/, loaders: [ "json-loader" ] },
  jsx: { test: /\.jsx$/, exclude: /node_modules/, loaders: [ "babel-loader"] },
  js: { test: /\.js$/, exclude: /node_modules/, loaders: [ "babel-loader"] },
  css: { test: /\.css$/, loaders: ["style", "css"] },
  scss: { test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"] },
  img: {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
  },
  font: {
    test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loaders: [ 'file?hash=sha512&digest=hex&name=./fonts/[hash].[ext]' ]
  },
  font2: {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=50000&mimetype=application/font-woff&name=./fonts/[hash].[ext]'
  }
};

const loadersToArray = (rawLoaders) => {
  const loaders = [];
  for (let file in rawLoaders) {
    if (rawLoaders.hasOwnProperty(file)) {
      loaders.push(rawLoaders[file]);
    }
  }
  return loaders;
};

// Config
const config = {

  // Entry file
  entry: [ "./client/index.jsx"],
  // Resolve .js, .jsx and .json
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  // Output to /build/js
  output: {
    path: path.join(__dirname, "build", "js"),
    filename: "bundle.js"
  },

  // Default loaders
  module: {
    loaders: loadersToArray(rawLoaders)
  },

  // Plugins
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};

module.exports = {
  config,
  rawLoaders,
  loadersToArray
};
