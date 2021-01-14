/*
 * @Author: snow
 * @Date: 2020-12-30 18:35:09
 * @LastEditors: snow
 * @LastEditTime: 2021-01-14 20:02:19
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
        // !问题:不能处理html本地的img图片,使用html-loader处理
        test: /\.(jpg|jpeg|gif|png)$/,
        use:[{
          loader: 'url-loader',
          options: {
            // *图片大小小于8kb,就会被base64处理
            // *优点: 减少请求数量(减少服务器压力)
            // *缺点: 图片会变大
            limit: 8*1024,
            // url-loader使用es6模块化解析,而html-loader使用commonjs模块解析,解析时会有问题
            // *解决关闭url-loader的es6模式,使用commonjs解析
            esModule: false,
            // *[hash:6]取图片的hash值前6位,ext-->原来文件的扩展值
            name: '[name]_[hash:6].[ext]'
          }
        }]
      },
      {
        //* 处理html文件的图片(负责引入img,从而能被url-loader处理)
        test: /\.html$/,
        use: ['html-loader']
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
