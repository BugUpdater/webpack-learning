class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    let index = 0
    const next = (err, data) => {
      let task = this.tasks[index];
      if (!task || err) {
        return finalCallback();
      }
      if (index === 0) {
        task(...args, next);
      } else {
        if (data === undefined) {
          task(...args, next);
        } else {
          task(data, next);
        }
      }
      index++;
    }
    next();
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    // ... TODO
  }
}

const hook = new AsyncSeriesWaterfallHook(['name']);

/**********************  Callback  **********************/
hook.tapAsync('node lesson', (name, cb) => {
  setTimeout(() => {
    console.log('node:', name);
    // cb('error', '-- node lesson pass --');
    cb(null, '-- node lesson pass --');
  }, 1000);
});
hook.tapAsync('react lesson', (data, cb) => {
  setTimeout(() => {
    console.log('react:', data);
    cb();
  }, 2000);
});

hook.callAsync('Mike', () => {
  console.log('end');
});

/**********************  Promise  **********************/
/* hook.tapPromise('node lesson', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node:', name);
      resolve('-- node lesson pass --');
    }, 1000);
  });
});
hook.tapPromise('react lesson', data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react:', data);
      resolve();
    }, 2000);
  });
});

hook.promise('Mike').then(() => {
  console.log('end');
}); */
