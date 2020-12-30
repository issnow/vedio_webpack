/*
 * @Author: snow
 * @Date: 2020-12-30 18:35:09
 * @LastEditors: snow
 * @LastEditTime: 2020-12-30 19:26:23
 * @Description: file content
 */
const path = require('path');
const HWP = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        use:[{
          loader: 'url-loader',
          options: {
            // *图片大小小于8kb,就会被base64处理
            // *优点: 减少请求数量(减少服务器压力 )
            // *缺点: 图片会变大
            limit: 8*1024
          }
        }]
      }
    ]
  },
  plugins: [
    new HWP({
      // filename: 'index.[hash:8].html',
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  mode: 'development'
}
