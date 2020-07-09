const path = require("path");
// 指定html入口模版
const HtmlWebpackPlugin = require("html-webpack-plugin");
// build时先清除原先内容
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 复制文件插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 版权插件为内置插件
const webpack = require('webpack');

module.exports = {
  // mode: "production", // 生产模式下才需要source-map
  mode: "development",
  entry: {
    home: "./src/index.js",
    other: "./src/other.js",
  },
  output: {
    // [name]: home, other
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    port: 3000, // 服务端的端口为5000
    contentBase: "./build",
    compress: true,

    // 简单转发
    /* proxy: {
      '/user': 'http://localhost:5000',
      '/address': 'http://localhost:5000',
    }, */

    // 统一前缀转发并重写路径
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },

    // mock数据
    before(app) {
      app.get('/api/user', (req, res) => {
        res.json({
          name: 'mock name'
        })
      })
    }
  },

  // 行和列，单独
  // devtool: 'source-map',
  // 行和列，集成
  // devtool: 'eval-source-map',
  // 行，单独
  // devtool: 'cheap-module-source-map',
  // 行，集成
  // devtool: 'cheap-module-eval-source-map',

  // watch打开自动重新编译，build的时候，会进入等待更新状态
  /* watch: true,
  watchOptions: {
    poll: 1000, // 每1000毫秒轮询检测一次变更（节流）
    aggregateTimeout: 500 ,// 停下输入超时500毫秒后重新编译（防抖）
    ignored: /node_modules/, // 忽略检测对象
  }, */

  resolve: {
    // 指定解析模块路径
    modules: [path.resolve(__dirname, 'other_modules_path'), 'node_modules'],

    // import 'bootstrap' 解析成 import 'bootstrap/dist/css/bootstrap.css'
    // 方法一：修改模块入口文件的key值，默认main
    mainFields: ['style', 'main'],
    // 方法二：增加别名
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.css',
    },

    // import模块时省略后缀名，自动依次按下列后缀查找文件
    // (只对本地文件模块有效，即./或../开头的模块)
    extensions: ['.js', '.css', '.json', '.vue'],
  },

  plugins: [
    // 同一个html模版生成不同的入口html
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html',
      // 不加chunks，默认加载所有js入口文件
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'other.html',
      chunks: ['other'],
    }),

    // 清除插件
    new CleanWebpackPlugin(),

    // 复制文件插件
    new CopyWebpackPlugin({
      // 接受一个数组 可以多个文件
      patterns: [
        { from: './doc', to: './ref-doc' },
      ]
    }),

    // 版权插件
    new webpack.BannerPlugin('Make in China! Author: BugUpdater. -- 2020.7.9'),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  }
};
