class AsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let count = 0;
    const done = () => {
      count++;
      if (count === this.tasks.length) {
        finalCallback();
      }
    }
    this.tasks.forEach(task => {
      task(...args, done);
    });
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);
  }
}

const hook = new AsyncParallelHook(['name']);

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

// AsyncParallelBailHook: 带保险的异步并发操作
// 有reject()就不向下执行，增加reject相关代码即可
