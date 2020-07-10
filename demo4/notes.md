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

### Webpack自带优化
> 用 `import` 的方式导入模块时，在**生产模式**下会有**tree-shaking**和**scope hosting**，而用 `require` 则不会有这些优化。
- **tree-shaking**：导入模块时自动删除模块中未使用到的方法。
- **scope hosting**：导入的模块在打包时直接注入代码到引用处，而不是正常导入方法(moduleId函数执行)，能减少函数声明进而提升性能。

### splitChunks
> - **多入口JS**情况下，如果一个模块被多个入口引用，则默认最终多个bundle.js里都会出现被引用的模块代码。(单入口多次引用同一模块，不会有重复代码)
> - 使用`splitChunks`可以抽离公共模块代码，以Jsonp的方式在多个入口中引用。

`cacheGrops` 的设置:
- **组名**: 一般用common、vendor来作为组名，也可以修改成其它名称，默认从上到下应用缓存组
- `chunks`
  + `initial`: 同步 (import xxx from 'xxx')
  + `async`: 异步 (import()懒加载)
  + `all`
- `minSize`: 模块大小多大以上开始抽离
- `minChunks`: 模块引用次数满足多少次开始抽离
