var path = require('path'),
    webpack = require('webpack');

module.exports = {

  entry: [
    './src/index'
  ],

  output: {
    publicPath: '/',
    filename: 'index.js'
  },

  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },

  debug: true

};