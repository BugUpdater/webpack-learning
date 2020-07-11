class Plugin2 {
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('emit', () => {
      console.log('afterPlugins 注册完插件');
    });
  }
}

module.exports = Plugin2;
