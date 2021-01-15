/*
 * @Author: snow
 * @Date: 2021-01-15 17:04:15
 * @LastEditors: snow
 * @LastEditTime: 2021-01-15 17:58:47
 * @Description: 
 */
const {resolve} = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // 将js打包到特定的目录,方便管理
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module:{
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader','css-loader','less-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8*1024,
            name: '[hash:8].[ext]',
            esModule: false,
            // 将图片资源打包到特定的目录,方便管理
            outputPath: 'imgs'
          }
        }],
        exclude: [
          resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        exclude: /\.(html|jsx?|css|less|jpg|jpeg|png|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:8].[ext]',
            // 将其他资源打包到特定的目录,方便管理
            outputPath: 'media'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:resolve(__dirname, 'src/index.html')
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 5001,
    host: 'localhost',
    hot: true,
    inline: true
  }
}