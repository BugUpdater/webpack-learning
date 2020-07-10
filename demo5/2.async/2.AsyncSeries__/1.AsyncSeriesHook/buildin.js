const { AsyncSeriesHook, AsyncSeriesBailHook } = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name']),
    };
  }

  /**********************  Callback  **********************/
  /* tap() {
    this.hooks.arch.tapAsync('node lesson', (name, cb) => {
      setTimeout(() => {
        console.log('node:', name);
        cb();
      }, 1000);
    });
    this.hooks.arch.tapAsync('react lesson', (name, cb) => {
      setTimeout(() => {
        console.log('react:', name);
        cb();
      }, 2000);
    });
  }

  start() {
    this.hooks.arch.callAsync('Mike', () => {
      console.log('end');
    });
  } */

  /**********************  Promise  **********************/
  tap() {
    this.hooks.arch.tapPromise('node lesson', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node:', name);
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise('react lesson', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react:', name);
          resolve();
        }, 2000);
      });
    });
  }

  start() {
    this.hooks.arch.promise('Mike').then(() => {
      console.log('end');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();
