//TODO: Build DIST with CDN URLs instead of single bundled JS

var path = require('path');

module.exports = {
  entry: ['./jekyll-src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // {
      //   test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
      //   use: {
      //     loader:'file-loader',
      //     options: {
      //       // name: '/assets/[name].[ext]'
      //     }
      //   },
      // }
    ]
  }
};