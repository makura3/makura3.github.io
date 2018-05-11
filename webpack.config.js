const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js', //今は必要ないがjs導入時に使いそうなのでほっとく
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scss'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{loader: 'css-loader', options: {url: false}}, 'sass-loader'],
        })
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
}