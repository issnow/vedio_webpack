/*
 * @Author: snow
 * @Date: 2020-12-30 17:29:00
 * @LastEditors: snow
 * @LastEditTime: 2020-12-30 18:23:21
 * @Description: file content
 */
/**
 * *注意:webpack5版本的需要安装npm i html-webpack-plugin@next
 */
let path = require('path')
const HWP = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    // *默认会创建一个空的html,自动引入打包输出的所有资源(js/css)
    new HWP({
      filename: 'index.[hash:8].html',
      // *目标html文件,不需要引入js/css资源,会自动引
      template: 'src/index.html'
    })
  ],
  mode: 'development'
}
