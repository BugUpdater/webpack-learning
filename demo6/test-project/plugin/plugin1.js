class Plugin1 {
  apply(compiler) {
    // 发射 订阅
    compiler.hooks.emit.tap('emit', () => {
      console.log('emit 发送文件完成');
    });
  }
}

module.exports = Plugin1;
