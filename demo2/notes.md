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

# 用 jquery 测试 expose-loader
yarn add -D jquery
yarn add -D expose-loader
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

## expose-loader

- 加载模块时，webpack会用立即执行函数形成闭包，因此直接导入 `jquery` 的方式不会生成全局变量 `$` 和 `jQuery`，使用 `expose-loader` 将变量暴露到全局。

- `expose-loader` 参数写法更新：
```js
  // 旧写法 --> 报错：options misses the property 'exposes'
  import $ from 'expose-loader?$!jquery';
  // 新写法
  import $ from 'expose-loader?exposes=$!jquery';
  // 多个全局变量
  import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery';
```

- 两种使用方式
  + inline loader 内联loader方式：
    ```
    import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery';
    ```
  + config 配置方式：
    ```
    {
      test: require.resolve('jquery'),
      // loader: 'expose-loader?exposes=$',
      // loader: 'expose-loader?exposes[]=$&exposes[]=jQuery',
      loader: 'expose-loader',
      options: {
        // exposes: '$',
        exposes: ['$', 'jQuery'],
      }
    },
    ```

