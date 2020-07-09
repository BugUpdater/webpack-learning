const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    // test: ['./src/test.dll.js'],
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'build'),
    library: '_dll_[name]',
    // libraryTarget默认值为var，即用var变量导出。其它可选值：commonjs、umd、this
    libraryTarget: 'var',
    // 导出结果为：(_dll_test.js) var _dll_test = ...
  },
  plugins: [
    // 导出 manifest.json 以及 _dll_react.js
    // webpack自带插件, 变成动态链接库
    new webpack.DllPlugin({ // name==library
      name: '_dll_[name]',
      // manifest.json就是一个任务清单
      path: path.resolve(__dirname, 'build', 'manifest.json'),
    })
  ]
}