# Notes

## Install and run
```sh
yarn add -D webpack webpack-cli webpack-dev-server
npx webpack

yarn add -D html-webpack-plugin

yarn add -D css-loader style-loader

yarn add -D less less-loader
yarn add -D node-sass sass-loader

yarn add -D mini-css-extract-plugin

yarn add -D postcss-loader autoprefixer

yarn add -D optimize-css-assets-webpack-plugin
```

## Config file name

- default
```js
// node_modules/webpack-cli/bin/config/config-yargs.js
defaultDescription: "webpack.config.js or webpackfile.js",
```

- custom
```sh
npx webpack --config webpack.config.my.js
```
use script:
- `--config` in scripts:
```json
"scripts": {
  "build": "webpack --config webpack.config.my.js"
}
```
```sh
npm run build
# or
yarn build
```

- `--config` in shell:
```json
"scripts": {
  "build": "webpack"
}
```
```sh
npm run build --config webpack.config.my.js # wrong!!!
npm run build -- --config webpack.config.my.js # right
# or
yarn build --config webpack.config.my.js # right
```

## webpack-dev-server
- Config in scripts:
  `--open` 启动后自动打开浏览器
```json
"scripts": {
  "dev": "webpack-dev-server --open --progress --port 3000"
}
```
- Config in `webpack.config.js`:
```js
devServer: {
  port: 3000, // --port 3000
  progress: true, // --progress
  // 静态文件的文件夹地址，默认为当前文件夹
  contentBase: "./build",
  // 启动gzip压缩
  compress: true,
},
```

## postcss-loader and autoprefixer

1. The `postcss-loader` position: `use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']`.
2. Config autoprefixer for postcss in `postcss.config.js`.
3. Config browsers list for autoprefixer in `.browserslistrc`.
