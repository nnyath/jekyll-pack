/* eslint global-require: 0 */

const webpack = require('webpack')
const configMerge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HOST = 'localhost'
const PORT = '3000'
const CONTEXT = path.join(__dirname, 'jekyll-src')

const buildJekyll = `jekyll build --source ./jekyll-src/ --destination ./dev`

module.exports = configMerge.smart(require('./webpack.base.js'), {

  context: CONTEXT,
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].js',
    publicPath: `http://${HOST}:${PORT}/`
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'webpack-module-hot-accept',
        }]
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.DefinePlugin({
      JEKYLL_PACK_VER: JSON.stringify(require("./package.json").version + "-dev"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true
    }),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: 'dev/',
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  }
})