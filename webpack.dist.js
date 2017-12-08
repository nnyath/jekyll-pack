/* eslint global-require: 0 */

const
  webpack = require('webpack'),
  configMerge = require('webpack-merge'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),

  CONTEXT = path.join(__dirname, 'jekyll-src')

module.exports = configMerge.smart(require('./webpack.base.js'), {
  context: CONTEXT,
  entry: {
    app: [
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    // rules: [
    //   {
    //     test: /\.js?$/,
    //     exclude: /node_modules/,
    //     use: [{
    //       loader: 'webpack-module-hot-accept'
    //     }]
    //   }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dist')
      }
    }),
    new webpack.DefinePlugin({
      JEKYLL_PACK_VER: JSON.stringify(require('./package.json').version + '-dist')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    })
  ]
})
