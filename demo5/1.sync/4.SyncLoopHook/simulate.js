class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}

const hook = new SyncLoopHook(['name']);

let count = 0;
hook.tap('node lesson', name => {
  console.log('node:', name);
  return ++count === 3 ? undefined : 'loop';
});
hook.tap('react lesson', name => {
  console.log('react:', name);
});
hook.tap('webpack lesson', name => {
  console.log('webpack:', name);
});

hook.call('Mike');
