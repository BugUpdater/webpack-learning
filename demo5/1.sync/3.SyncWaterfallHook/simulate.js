class SyncWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const [first, ...others] = this.tasks;
    const ret = first(...args);
    // 不考虑未return：
    // others.reduce((r, n) => n(r), ret);

    // 完整考虑return：
    others.reduce((r, n) => {
      if (r !== undefined) {
        args[0] = r;
      }
      return n(...args);
    }, ret);
  }
}

const hook = new SyncWaterfallHook(['name']);

hook.tap('node lesson', name => {
  console.log('node:', name);
  return '-- node lesson pass --';
});
hook.tap('react lesson', data => {
  console.log('react:', data);
  return '-- react lesson pass --';
});
hook.tap('webpack lesson', data => {
  console.log('webpack:', data);
});

hook.call('Mike');
