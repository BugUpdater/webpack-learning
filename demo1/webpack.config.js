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
    // filename: "bundle.js", // 打包后的文件名
    // filename: "bundle.[hash].js", // hash
    filename: "bundle.[hash:8].js", // hash:8只显示8位
    path: path.resolve(__dirname, "build"), // 必须是绝对路径
  },
  //开发服务器的配置
  devServer: {
    port: 3000, // --port 3000
    // progress: true, // --progress
    // 静态文件的文件夹地址，默认为当前文件夹
    contentBase: "./build",
    // 启动gzip压缩
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板
      filename: 'index.html',
      // 压缩 html 
      minify: {
        // 删除属性双引号
        // removeAttributeQuotes: true,
        // 压缩html变成一行
        // collapseWhitespace: true,
      },
      // 引用的外部文件名称末尾加上一个hash值
      hash: true,
    }),
    // 
    new MiniCssExtractPlugin({
      // 产生到css目录下
      filename: 'css/main.[hash].css',
    }),
    // 压缩css的插件
    new OptimizeCSSPlugin(),
  ],
  module: {
    rules: [
      // 处理样式
      {
        test: /\.css$/,
        // use数组从后往前依次加载
        use: [
          // style-loader 保存css代码在js中，由js动态插入style标签到header末尾
          // (如果模版index.html有style标签样式，因优先级会被覆盖)
          // 'style-loader',
          // 保存css代码在单独文件中，用link标签引入
          MiniCssExtractPlugin.loader,
          // css-loader 处理css文件 解析@import语法、background-image: url(xxx.png)语法
          'css-loader',
          // 增加浏览器前缀(-webkit-等)
          'postcss-loader',
        ]
      },
      {
        // node-sass sass-loader
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
    ],
  }
};
