const { SyncHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name']),
    };
  }

  tap() {
    this.hooks.arch.tap('node lesson', name => {
      console.log('node:', name);
    });
    this.hooks.arch.tap('react lesson', name => {
      console.log('react:', name);
    });
  }

  start() {
    this.hooks.arch.call('Mike');
  }
}

const l = new Lesson();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子函数
