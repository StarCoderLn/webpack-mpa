const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');

module.exports = {
  entry: {
    'index': './mpa/src/views/index.entry.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './mpa/src/views/index.html',
      inject: false // 不让 HtmlWebpackPlugin 往 html 里插东西
    }),
    new htmlAfterWebpackPlugin()
  ]
}