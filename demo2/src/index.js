import $ from 'jquery';
// import jQuery from 'jquery';
// import $ from 'expose-loader?exposes=$!jquery';
// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery';
console.log(`\n【 $ 】===>\n`, $);
console.log(`\n【 window.$ 】===>\n`, window.$);
// console.log(`\n【 jQuery 】===>\n`, jQuery);
// console.log(`\n【 window.jQuery 】===>\n`, window.jQuery);

require('./index.css');
require('./index.less');

require('@babel/polyfill');

const str = require('./a.js').default;
console.log('get text:', str);


// ES6 新语法：箭头函数 和 简单的类定义
// (只需要 @babel/preset-env )
let fn = () => {
  console.log('arrow function');
}
fn();

class A {
  
}
const a = new A();

// ES7 新语法：类装饰器、类属性
// (需要 @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties)
@log
class P {
  x = 111;
}
const p = new P();
console.log(p.x);

function log(target) {
  console.log('decorator:', target);
}

// ES7 新API：generator、includes
// (需要 @babel/polyfill，否则报错 ReferenceError: regeneratorRuntime is not defined)
function* gen() {
  yield 1;
}
console.log('generator:', gen().next());

console.log('aaa'.includes('a'));

// 图片处理 file-loader
import headImg from './head-img.png';
const image = new Image();
// image.src = './head-img.png'; // wrong!!!
image.src = headImg;

document.body.appendChild(image);
