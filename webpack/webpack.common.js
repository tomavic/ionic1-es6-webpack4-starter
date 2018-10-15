const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dest = Path.join(__dirname, '../www');

module.exports = {
  entry: [
    Path.resolve(__dirname, './polyfills'),
    Path.resolve(__dirname, '../src/index')
  ],
  output: {
    path: dest,
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin([dest], { root: Path.resolve(__dirname, '..') }),
    // new CopyWebpackPlugin([
    //   { from: Path.resolve(__dirname, '../src/assets'), to: 'assets' }
    // ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
};
