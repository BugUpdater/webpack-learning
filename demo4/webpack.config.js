const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
// 用happypack启用多线程打包
const Happypack = require('happypack');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.js',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    port: 3000,
    contentBase: "./build",
    compress: true,
    // open: true,
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
