// import $ from 'jquery';
// import * as _ from 'lodash';

console.log('index');


/* 
import moment from 'moment';

// moment.locale('us'); // 英文

// 用ignorePlugin之后，要手动引入所需要的语言包
import 'moment/locale/zh-cn';

moment.locale('zh-cn'); // 中文

// 默认英文
let fromNow = moment().endOf('day').fromNow();
console.log(`\n【 fromNow 】===>\n`, fromNow);
*/


// react测试动态链接库
import React from 'react';
import { render } from 'react-dom';

render(<h1>jsx</h1>, window.root);

import './index.css';

// tree-shaking和scope hosting
// 用 import 的方式导入模块时，在生产模式下会有tree-shaking和scope hosting，而用 require 则不会有这些优化。
import calc from './import-test';
console.log('calc import result:', calc.sum(1, 2));

// const calc = require('./import-test');
// console.log('calc require result:', calc.default.sum(1, 2));

// webpack还会自动省略可以简化的代码
const a = 1;
const b = 2;
const c = 3;
const d = a + b + c;
console.log(d + '---------');

// splitChunks测试
import './a';
import './b';

import $ from 'jquery';

console.log('index splitChunks test');
