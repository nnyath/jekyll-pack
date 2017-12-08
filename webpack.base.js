/* eslint global-require: 0 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      /*
          CSS loader for npm modules that are shipped with CSS that should be loaded without processing.
          List all external themes in the array
      */
      // {
      //   test: /\.css$/,
      //   include: [],
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader',
      //   }),
      // },
      {
        /* PostCSS for our CSS */
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test: /\.(png|eot|woff|woff2|ttf|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: { loader: 'url-loader', options: { limit: 10000 } }
      }
    ]
  },
  plugins: [],
  target: 'web'
}
