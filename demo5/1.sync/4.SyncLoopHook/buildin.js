const { SyncLoopHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncLoopHook(['name']),
    };
    this.count = 0;
  }

  tap() {
    this.hooks.arch.tap('node lesson', name => {
      console.log('node:', name);
      return ++this.count === 3 ? undefined : 'loop';
    });
    this.hooks.arch.tap('react lesson', name => {
      console.log('react:', name);
    });
    this.hooks.arch.tap('webpack lesson', name => {
      console.log('webpack:', name);
    });
  }

  start() {
    this.hooks.arch.call('Mike');
  }
}

const l = new Lesson();
l.tap();
l.start();
