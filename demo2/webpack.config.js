const path = require("path");
// 指定html入口模版
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 设置css单独生成文件，而不是放在html的style标签中
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

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
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
  ],
  // 引入jquery会忽略掉(已经在cdn引入了)
  /* externals: {
    jquery: '$'
  }, */
  module: {
    rules: [
      // HTML处理图片
      {
        test: /\.(htm|html)$/i,
        use: 'html-withimg-loader',
      },
      // 图片
      {
        test: /\.(png|jpg|gif)$/i,
        //做一个限制  当小于多少k 用base64来转化 base64文件可以减少http请求 但是比原文件大3分之1
        // 否则用file-loader来产生真实的图片
        use: 'file-loader',
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 1,
        //     //输出的路径
        //     outputPath: 'img/',
        //     //只在图片中有一个公共的路径
        //     publicPath: 'http:/111'
        //   }
        // }
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader',
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      // expose-loader
      /* {
        test: require.resolve('jquery'),
        // loader: 'expose-loader?exposes=$',
        // loader: 'expose-loader?exposes[]=$&exposes[]=jQuery',
        loader: 'expose-loader',
        options: {
          // exposes: '$',
          exposes: ['$', 'jQuery'],
        }
      }, */
      // ESLint
      /* {
        // 多个匹配js文件的规则，从后往前执行，为了保证eslint先执行，可以设置enforce属性。
        enforce: 'pre', // post、normal
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, */
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
        // exclude: /node_modules/,
      },
    ],
  }
};
