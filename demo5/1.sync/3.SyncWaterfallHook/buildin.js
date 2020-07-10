const { SyncWaterfallHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name']),
    };
  }

  tap() {
    this.hooks.arch.tap('node lesson', name => {
      console.log('node:', name);
      // return的值会替换最初入参序列的第一个参数，其它参数原样往后传递
      return '-- node lesson pass --';
    });
    this.hooks.arch.tap('react lesson', data => {
      console.log('react:', data);
      return '-- react lesson pass --';
    });
    this.hooks.arch.tap('webpack lesson', data => {
      // 上一个没return值时，入参第一个参数可能是上上个return的值
      // 若从未return，则跟初始入参第一个参数相同，第二个以后的参数都与最初保持不变
      console.log('webpack:', data);
    });
  }

  start() {
    this.hooks.arch.call('Mike');
  }
}

const l = new Lesson();
l.tap();
l.start();
