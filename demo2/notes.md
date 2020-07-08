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

# ESLint
yarn add -D eslint eslint-loader
```

### Babel

- `@babel/runtime` `@babel/plugin-transform-runtime`的作用： 抽取babel公共的工具类函数
> 比如class语法转换的时候，会生成工具函数_classCallCheck。
> 如果有多个class在不同文件，则会在不同文件中都生成_classCallCheck函数定义，造成大量冗余代码。
> 使用这个插件后，会把这些工具类函数统一封装，在使用的地方直接import。

- babel-loader的规则中，`include` 和 `exclude` 只需配置其中一个。

## ESLint
- 直接从官网配置并下载对应配置文件：[https://eslint.org/demo](https://eslint.org/demo)，下载后在默认文件名称前加个点变成 `.eslintrc.json`。
- 配置的时候，需要配置es6以上，且sourceType为module，否则解析不了es6语法 `import` `export` 等。
```json
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {}
  },
```
