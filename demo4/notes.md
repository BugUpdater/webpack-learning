# Notes

## Install and run
```sh
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react style-loader css-loader

yarn add -D jquery lodash

yarn add -D moment

yarn add react react-dom

yarn add -D happypack
```

## webpack打包优化

### noParse
```js
// 对于确定是独立的模块如jquery或lodash，用noParse使webpack不解析它们的依赖包
module: {
  noParse: /jquery|lodash/,
}
```

### IgnorePlugin
```js
// 解析时不引入moment模块中的语言包，路径node_modules/moment/locale/
new webpack.IgnorePlugin(/\.\/locale/, /moment/),
```

### 动态链接库

> 将基本不变的第三方依赖打包成动态链接库，这样每次只需要打包经常修改的文件，提升效率。
1. 生成react动态链接库，导出 manifest.json 以及 _dll_react.js
```sh
yarn build --config webpack.config.react.js
```
2. 在html中引入动态链接库，才能得到 _dll_react 变量
```html
<script src="./_dll_react.js"></script>
```
3. 在主程序打包时引入动态链接库
```js
new webpack.DllReferencePlugin({
  manifest: path.resolve(__dirname, 'build', 'manifest.json'),
}),
```

### happypack
- 用happypack启用多线程打包，默认3个线程。
- 适用于项目比较大的情况，简单文件打包用多线程可能反而变慢，因为开启线程也需要性能消耗。
