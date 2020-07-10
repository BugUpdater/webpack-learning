const { SyncBailHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name']),
    };
  }

  tap() {
    this.hooks.arch.tap('node lesson', name => {
      console.log('node:', name);
      // 返回undefined才往后执行，返回其它值包括null都会停止执行
      return `Don't learn next lesson`;
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
l.tap();
l.start();
