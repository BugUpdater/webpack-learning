class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let count = 0;
    const next = () => {
      if (count === this.tasks.length) return finalCallback();
      const task = this.tasks[count++];
      task(...args, next);
    }
    next();
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const [first, ...others] = this.tasks;
    return others.reduce((p, n) => {
      return p.then(() => n(...args));
    }, first(...args));
  }
}

const hook = new AsyncSeriesHook(['name']);

/**********************  Callback  **********************/
/* hook.tapAsync('node lesson', (name, cb) => {
  setTimeout(() => {
    console.log('node:', name);
    cb();
  }, 1000);
});
hook.tapAsync('react lesson', (name, cb) => {
  setTimeout(() => {
    console.log('react:', name);
    cb();
  }, 2000);
});

hook.callAsync('Mike', () => {
  console.log('end');
}); */

/**********************  Promise  **********************/
hook.tapPromise('node lesson', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node:', name);
      resolve();
    }, 1000);
  });
});
hook.tapPromise('react lesson', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react:', name);
      resolve();
    }, 2000);
  });
});

hook.promise('Mike').then(() => {
  console.log('end');
});

// AsyncSeriesBailHook: 带保险的异步串行操作
// 有reject()就不向下执行，增加reject相关代码即可
