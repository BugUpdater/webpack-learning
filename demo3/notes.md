# Notes

## Install and run
```sh
yarn add -D clean-webpack-plugin
yarn add -D copy-webpack-plugin
```

## 多页应用
多入口js，多html模版。

## Source Map

|   `devtool`     | 显示行和列  |  只显示行
|  ----------  | --------------  | -------------------   |
| 单独的map文件  | `source-map`      |  `cheap-module-source-map` |
| 集成到打包文件  | `eval-source-map` | `cheap-module-eval-source-map`  |
