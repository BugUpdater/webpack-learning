const path = require("path");
// 指定html入口模版
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 设置css单独生成文件，而不是放在html的style标签中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // mode: "production",
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "build"),
  },
  //开发服务器的配置
  devServer: {
    port: 3000,
    contentBase: "./build",
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[hash].css',
    }),
    new OptimizeCSSPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                // ES7 新语法：类装饰器、类属性（这两个插件，decorators必须放在class-properties前面）
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ['@babel/plugin-proposal-class-properties', { "loose": true }],
                // 抽取babel公共的工具类函数
                '@babel/plugin-transform-runtime',
              ]
            }
          }
        ],
        //包括
        include: path.resolve(__dirname, 'src'),
        //排除
        exclude: /node_modules/
      },
    ],
  }
};
