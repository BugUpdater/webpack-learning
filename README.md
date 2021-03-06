# webpack-learning (2020.07)

> 学习Webpack的代码笔记整理

- webpack 4.43.0
- babel 7.10.4


## Demo1

- Base Config: `mode`/`entry`/`output`
- Html: `html-webpack-plugin`
- Dev Server: `webpack-dev-server`
- Css
  + Base: `css-loader` `style-loader`
  + Less/Sass: `less-loader` `sass-loader`
  + Seperate Css File: `mini-css-extract-plugin`
  + Browser Prefix: `postcss-loader` `autoprefixer`
  + Compress: `optimize-css-assets-webpack-plugin`

[Demo1 Notes](./demo1/notes.md)


## Demo2

- JS
  + ES6/ES7 -> ES5: `babel-loader` (presets/plugins/runtime/polyfill)
  + Format: `eslint-loader`
  + Global Variable: `expose-loader` `webpack.ProvidePlugin` `CDN(externals)`
- Images
  + JS/CSS: `file-loader`/`url-loader`
  + HTML: `file-loader`/`url-loader` + `html-withimg-loader`

[Demo2 Notes](./demo2/notes.md)


## Demo3

- Multiple Entries
  + JS: output--filename ([name].js)
  + HTML: `html-webpack-plugin` (chunks)
- Little Plugins
  + `clean-webpack-plugin`
  + `copy-webpack-plugin`
  + buidin: `webpack.BannerPlugin`
- Webpack Propertis
  + `devtool`: Source Map
  + `watch` `watchOptions`: Auto Rebuild
  + `resolve`: Resolve Modules
- Cross Origin
  + `proxy`
  + `before(app)`(mock)
  + `webpack-dev-middleware`
- Environment
  + Env Variables: `webpack.DefinePlugin`
  + Split Config: `webpack-merge`

[Demo3 Notes](./demo3/notes.md)


## Demo4

- optimization
  + noParse: `noParse: /jquery|lodash/`
  + IgnorePlugin: `new webpack.IgnorePlugin(/\.\/locale/, /moment/)`
  + Dll: `webpack.DllPlugin` `webpack.DllReferencePlugin`
  + Multiple Threads Pack: `happypack`
  + Buildin: **tree-shaking**, **scope hosting**
  + Common Codes(Multiple Entries): `splitChunks`
  + Lazy Load: `import('xxx').then(data => console.log(data.default));`
  + HMR: `webpack.HotModuleReplacementPlugin` `webpack.NamedModulesPlugin` `module.hot.accept()`

[Demo4 Notes](./demo4/notes.md)


## Demo5

- tapable
  + Sync: `SyncHook` `SyncBailHook` `SyncWaterfallHook` `SyncLoopHook`
  + Async: `AsyncParallelHook(AsyncParallelBailHook)` `AsyncSeriesHook(AsyncSeriesBailHook)` `AsyncSeriesWaterfallHook`


## Demo6

- write a simple webpack
  + bin project - `my-webpack`: `fs` `path` AST(`babylon` `@babel/types` `@babel/traverse` `@babel/generator`) `tapable` `ejs`
  + test project: write loaders(`style-loader` `less-loader`), write plugins(`tapable`)

```sh
    # bin project
    npm link

    # test project
    npm link my-webpack
    npx my-webpack
```
