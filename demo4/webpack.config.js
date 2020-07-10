const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
// 用happypack启用多线程打包
const Happypack = require('happypack');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: {
    home: './src/index.js',
    other: './src/other.js',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    port: 3000,
    contentBase: "./build",
    compress: true,
    // open: true,
  },
  optimization: {
    // splitChunks抽离出的代码底层用了Jsonp
    splitChunks: {  // 分割代码块
      cacheGroups: {  // 缓存组
        common: {    // 公共模块 
          chunks: 'initial',
          minSize: 0, // 模块大小多大以上开始抽离
          minChunks: 2, // 模块引用次数满足多少次开始抽离
        },
        // 把jquery等第三方模块先抽离到vendor.js，其它再抽离到common.js
        vendor: {  // 一般用vendor表示第三方模块
          priority: 1, // 默认从上到下应用缓存组，用priority属性先抽离第三方模块
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        }
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 排除node_modules/moment/locale/
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    // 引用动态链接库
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'build', 'manifest.json'),
    }),
    // 用happypack启用多线程打包
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          }
        }
      ],
    }),
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader'],
    }),
  ],
  module: {
    // 对于确定是独立的模块如jquery或lodash，用noParse使webpack不解析它们的依赖包
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/,
        /* use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            }
          }
        ], */
        use: 'Happypack/loader?id=js',
      },
      {
        test: /\.css$/,
        use: 'Happypack/loader?id=css',
      }
    ],
  }
};
