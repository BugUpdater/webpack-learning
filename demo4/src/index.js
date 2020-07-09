import $ from 'jquery';
import * as _ from 'lodash';

console.log('index');


import moment from 'moment';

// moment.locale('us'); // 英文

// 用ignorePlugin之后，要手动引入所需要的语言包
import 'moment/locale/zh-cn';

moment.locale('zh-cn'); // 中文

// 默认英文
let fromNow = moment().endOf('day').fromNow();
console.log(`\n【 fromNow 】===>\n`, fromNow);


// react测试动态链接库
import React from 'react';
import { render } from 'react-dom';

render(<h1>jsx</h1>, window.root);
