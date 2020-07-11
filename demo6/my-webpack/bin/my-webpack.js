#! /usr/bin/env node
// 表示在node环境下运行

// console.log('my webpack test');

const path = require('path');

const config = require(path.resolve('webpack.config.js'));
const Compiler = require('../lib/Compiler');
const compiler = new Compiler(config);

// 入口函数
compiler.hooks.entryOption.call();

compiler.run();
