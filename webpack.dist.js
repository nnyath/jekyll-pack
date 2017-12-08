/* eslint global-require: 0 */

const
  webpack = require('webpack'),
  configMerge = require('webpack-merge'),
  path = require('path'),
  glob = require('glob'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  PurifyCSSPlugin = require('purifycss-webpack')

module.exports = configMerge.smart(require('./webpack.base.js'), {
  entry: {
    app: [
      './jekyll-src/index.js'
    ].concat(glob.sync('./jekyll-src/assets/**/*.+(gif|png|jpe?g|svg)'))
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: /(node_modules|bower_components|.sass-cache)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dist')
      }
    }),
    new webpack.DefinePlugin({
      JEKYLL_PACK_VER: JSON.stringify(require('./package.json').version + '-dist')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync('./dist/**/*.html'),
      purifyOptions: {
        whitelist: ['is-clipped', 'is-hidden', 'is-warning', 'is-success']
      },
      minimize: true
    })
  ]
})
