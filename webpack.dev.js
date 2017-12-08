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
      'webpack-hot-middleware/client',
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {loader: 'webpack-module-hot-accept'},
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
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
  devtool: 'source-map'
})
