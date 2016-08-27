// Webpack config
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  // Use client as our root
  context: __dirname,
  // Entry file
  entry: [
    'webpack/hot/dev-server', // "only" prevents reload on syntax errors (https://gaearon.github.io/react-hot-loader/getstarted/)
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
        { test: /\.json$/, exclude: /node_modules/, loaders: [ "json-loader" ] },
        { test: /\.jsx$/, exclude: /node_modules/, loaders: [ "react-hot", "babel-loader"] },
        { test: /\.js$/, exclude: /node_modules/, loaders: [ "react-hot", "babel-loader"] },
        { test: /\.css$/, loaders: ["style", "css"] },
        { test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"] },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
          test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loaders: [ 'file?hash=sha512&digest=hex&name=[hash].[ext]' ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url?limit=50000&mimetype=application/font-woff&name=./fonts/[hash].[ext]'
        }
      ]
    },
  // Plugins
  plugins: [
    new webpack.optimize.DedupePlugin(),
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
