// module.exports = 'text exports from a.js';
// 使用 @babel/plugin-transform-runtime 之后，会在文件里增加import模块代码，此时代码变成ES6模块
// 不能同时使用module.exports这种commonjs模块的语法，即import与module.exports不能混用
// 否则报错：Cannot assign to read only property 'exports' of object '#<Object>'
// 参考：https://github.com/webpack/webpack/issues/4039
export default 'text exports from a.js';

class B {
  
}
