/* eslint global-require: 0 */

const
  webpack = require('webpack'),
  configMerge = require('webpack-merge'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),

  HOST = 'localhost',
  PORT = '3000',
  CONTEXT = path.join(__dirname, 'jekyll-src')

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
          loader: 'webpack-module-hot-accept'
        }]
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new webpack.DefinePlugin({
      JEKYLL_PACK_VER: JSON.stringify(require('./package.json').version + '-dev')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: 'dev/',
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
})
