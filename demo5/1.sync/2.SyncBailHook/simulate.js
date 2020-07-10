class SyncBailHook {
  constructor(args) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let ret;
    let index = 0;
    do {
      ret = this.tasks[index++](...args);
    } while (ret === undefined && index < this.tasks.length);
  }
}

const hook = new SyncBailHook(['name']);

hook.tap('node lesson', name => {
  console.log('node:', name);
  return `Don't learn next lesson`;
});
hook.tap('react lesson', name => {
  console.log('react:', name);
});

hook.call('Mike');
