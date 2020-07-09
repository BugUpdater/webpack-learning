# Notes

## Install and run
```sh
yarn add -D clean-webpack-plugin
yarn add -D copy-webpack-plugin

yarn add bootstrap

yarn add -D webpack-dev-middleware
```

## 多页应用
多入口js，多html模版。

## Source Map

|   `devtool`     | 显示行和列  |  只显示行
|  ----------  | --------------  | -------------------   |
| 单独的map文件  | `source-map`      |  `cheap-module-source-map` |
| 集成到打包文件  | `eval-source-map` | `cheap-module-eval-source-map`  |

## Resolve

bootstrap中如要只想引入样式，希望
```js
import 'bootstrap';
```
自动解析成:
```js
import 'bootstrap/dist/css/bootstrap.css';
```
(1) 方法一：resolve--mainFields字段
bootstrap模块的package.json文件：
```json
{
  "style": "dist/css/bootstrap.css",
  "main": "dist/js/bootstrap.js",
}
```
可以设置 `mainFields: ['style', 'main'],` 可优先用style字段作为入口文件

(2) 方法二：resolve--alias字段
```js
alias: {
  bootstrap: 'bootstrap/dist/css/bootstrap.css',
}
```

## 跨域问题

服务端用express，由于 `webpack-dev-server` 依赖于express，无需再安装express。

- `devServer` -- `proxy`
- `devServer` -- `before(app) {}`: mock数据，优先级高于proxy
- 直接在node服务端利用中间件 `webpack-dev-middleware` 启动前端web服务
