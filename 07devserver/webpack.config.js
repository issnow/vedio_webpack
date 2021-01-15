/*
 * @Author: snow
 * @Date: 2021-01-15 15:39:03
 * @LastEditors: snow
 * @LastEditTime: 2021-01-15 16:49:22
 * @Description: dev server
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  // watch: true,
  devtool: 'eval-cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    // * dist的目录下再来一层static目录,哦也
    // publicPath: '/static/',
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                'corejs': 3
              }]
            ]
          }
        }
      ],
    }, {
      test: /\.(c|le)ss$/i,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      // *打包其他资源(除了html/js/css/less以外的资源)
      exclude: /\.(css|html|js|less)$/,
      loader: 'file-loader',
      options: {
        // *名字太长了,使用hash8缩短
        name: '[hash:8].[ext]'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  /**
   * npm的m是Management，npx的x可以理解为eXecute。
   * npx也可以理解为少些package.json里一个script而诞生的。
   */
  //* 开发服务器,只会在内存中编译打包,命令行启动指令:npx webpack-dev-server
  devServer: {
    //* 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
    contentBase: path.resolve(__dirname, '/dist/'),
    //* 是否启用 gzip 压缩
    compress: true,
    //* 指定要监听请求的端口号：默认8080
    port: 5000,
    // *指定要使用的 host
    host: 'localhost',
    //* 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    //To show only errors in your bundle
    stats: "errors-only", //终端仅打印 error
    // 启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的
    overlay: false, //默认不启用
    //当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换(Hot Module Replacement)启用时
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩

    //* Tells dev-server to open the browser after server had been started. Set it to true to open your default browser.
    open: true,

    //* Enable webpack's Hot Module Replacement feature:(热更新)
    hot: true,

    //* 配置代理,请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // },
    // 如果你不想始终传递 /api ，则需要重写路径：
    // !虽然设置了代理,但是在浏览器的network中仍然显示未代理的路径: http://localhost:4000/get/data
    proxy: {
      //* 如果后端接口也是api开头,则请求/api/user-->http://localhost:3000/api/user
      "/api": {
        target: "http://localhost:3000",
        // pathRewrite: {"^/api" : ""}
      },
      //* 如果后端接口不是api开头,则请求/get/data-->http://localhost:3000/data
      '/get': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/get': ''
        }
      }
    }
  },
};