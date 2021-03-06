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

# 图片处理
yarn add -D file-loader
yarn add -D html-withimg-loader
yarn add -D url-loader
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

## 全局变量处理

加载模块时，webpack会用立即执行函数形成闭包，因此直接导入 `jquery` 的方式不会生成全局变量 `$` 和 `jQuery`。

### 1. 使用 `expose-loader` 将变量暴露到全局

- 结果：`$` 和 `window.$` 都有值。

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

### 2. 使用 `webpack.ProvidePlugin` 插件

- 结果：`$` 有值，`window.$` undefined。
> `webpack.ProvidePlugin` 会自动为每个模块注入jquery，不需要在模块内编写import代码即可使用。
> 使用上像全局变量，实际只是省略自己手写导入，仍为局部变量。

### 3. 使用CDN引入jquery

- 结果：`$` 和 `window.$` 都有值。
> 使用CDN后不需要在模块内import，如果写了import也会一起打包。
> 设置webpack的 `externals` 属性，可以忽略模块内的import。

**个人总结**：如果要一起打包，可以结合使用 `expose-loader` 和 `webpack.ProvidePlugin`；如果不想打包使用CDN，则用CDN方式结合 `externals` 属性。

## 图片处理

需要 `file-loader` 支持。

### JS中引入图片
```js
import headImg from './head-img.jpg';
const image = new Image();
// image.src = './head-img.jpg'; // wrong!!!
image.src = headImg;
```

### CSS中引入背景图片
```css
background-image: url(./head-img.jpg);
```

```js
new MiniCssExtractPlugin({
  filename: 'css/main.[hash].css',
}),

{
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../',
  }
},
```
> - 写法不变，不需要改成`require`或`import`的形式，`css-loader`会自动解析`url()`。
> - 使用`MiniCssExtractPlugin`将css文件放到内层文件夹，如`filename: 'css/main.[hash].css'`，则css文件中的url当前文件夹是css文件夹，需要同时设置`publicPath`才能使图片路径匹配上。

### HTML中引入图片

> 写法不变，加上loader: `html-withimg-loader`。

**`file-loader`升级到5.0之后，默认为ES6模块，使用`html-withimg-loader`时url会被default属性包一层，因此需要在`file-loader`或`url-loader`规则中增加`options`设置`esModule: false`。**

### Base64编码

`url-loader` 根据limit值(单位字节)，小于该值用base64编码，可以减少http请求，但会比原文件大三分之一

### 文件分类

- 本地目录
  + 图片：设置 `url-loader` 或 `file-loader` 的 `outputPath` 属性；
  + JS：output--filename 中设置文件夹前缀，如 `filename: "js/bundle.[hash:8].js",`；
  + CSS：MiniCssExtractPlugin--filename；
- 远程公共路径
  + 所有资源统一前缀：output--publicPath；
  + 仅设置图片资源有前缀：`url-loader` 或 `file-loader` 的 `publicPath` 属性。

**配置publicPath时，如“http://www.example.com”，结尾不需要斜杠。
对于JS和CSS，filename前会自动用斜杠分隔，而对于图片，会直接拼接上outputPath，因此图片资源的outputPath最好设置为绝对路径，即斜杠开头，否则配置output--publicPath时会少了斜杠。**
