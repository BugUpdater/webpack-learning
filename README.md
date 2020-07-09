# webpack-learning
> 学习Webpack的代码笔记整理

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

[Demo3 Notes](./demo3/notes.md)
