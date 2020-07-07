# Notes

## Install and run
```sh
# ES6 --> ES5
yarn add -D babel-loader @babel/core @babel/preset-env
# ES7 --> ES5
yarn add -D @babel/plugin-proposal-decorators
yarn add -D @babel/plugin-proposal-class-properties

yarn add -D @babel/plugin-transform-runtime
# production dependencies
yarn add @babel/runtime
yarn add @babel/polyfill
```

### Babel

`@babel/runtime` `@babel/plugin-transform-runtime`的作用： 抽取babel公共的工具类函数
> 比如class语法转换的时候，会生成工具函数_classCallCheck。
> 如果有多个class在不同文件，则会在不同文件中都生成_classCallCheck函数定义，造成大量冗余代码。
> 使用这个插件后，会把这些工具类函数统一封装，在使用的地方直接import。
