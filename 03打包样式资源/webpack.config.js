/**
 * 配置文件webpack.config.js
 * 作用:增强webpack功能
 * 所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs,所以webpack.config.js是用module.exports导出
 */
let path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    // 路径
    path: path.resolve(__dirname, './build'),
    // 文件名
    filename: 'built.[hash:8].js'
  },
  module: {
    rules: [
      // loaders配置,不同文件必须配置不同loader处理
      {
        // 匹配那些文件
        test: /\.(c|le)ss$/,
        use: [
          // use数组中loader执行顺序:从后向前
          // 创建style标签,将js中的样式资源插入,添加到header中
          'style-loader',
          // 将css文件变成commonjs模块加载到js中,里面内容是样式字符串
          'css-loader',
          'less-loader'
        ]
      },
      
    ]
  },
  // plugins配置
  plugins: [
    
  ],
  // 模式 development, production
  mode: 'development'
}