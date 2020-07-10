const { AsyncSeriesWaterfallHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name']),
    };
  }

  /**********************  Callback  **********************/
  tap() {
    this.hooks.arch.tapAsync('node lesson', (name, cb) => {
      setTimeout(() => {
        console.log('node:', name);
        // cb('error', '-- node lesson pass --');
        cb(null, '-- node lesson pass --');
      }, 1000);
    });
    this.hooks.arch.tapAsync('react lesson', (data, cb) => {
      setTimeout(() => {
        console.log('react:', data);
        cb();
      }, 2000);
    });
  }

  start() {
    this.hooks.arch.callAsync('Mike', () => {
      console.log('end');
    });
  }

  /**********************  Promise  **********************/
  /* tap() {
    this.hooks.arch.tapPromise('node lesson', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node:', name);
          resolve('-- node lesson pass --');
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise('react lesson', data => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react:', data);
          resolve();
        }, 2000);
      });
    });
  }

  start() {
    this.hooks.arch.promise('Mike').then(() => {
      console.log('end');
    });
  } */
}

const l = new Lesson();
l.tap();
l.start();
