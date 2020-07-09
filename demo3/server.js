const express = require('express');

const app = express();

const webpack = require('webpack');

// 使用中间件在服务端直接启动前端web服务
/* const middle = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
app.use(middle(compiler)); */

app.get('/user',(req,res)=>{
  res.json({
    name: 'api name',
  });
});

app.get('/address',(req,res)=>{
  res.json({
    address: 'api address',
  });
});

// 服务端的端口号
app.listen(5000);
