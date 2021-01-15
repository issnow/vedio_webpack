const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  watch: true,
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
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 5000,
  },
};