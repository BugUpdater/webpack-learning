const fs = require('fs');
const path = require('path');

const babylon = require('babylon');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
// babelon 把源码解析成AST
// @babel/traverse   遍历节点
// @babel/types   节点替换
// @babel/generator 生成

const { SyncHook } = require('tapable');
const ejs = require('ejs');

class Compiler {
  constructor(config) {
    // entry output
    this.config = config;
    // 保存文件路径
    this.entryId; //'./src/index.js'
    // 保存所有模块依赖
    this.modules = {};
    this.entry = this.config.entry;
    // 可能输出多个文件
    this.assets = {};
    // 表示 工作路径
    this.root = process.cwd();
    // 模拟webpack的生命周期
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };
    const plugins = this.config.plugins;
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }

  // 获取源代码包括loader处理
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf-8');
    // 处理 ./index.less
    let rules = this.config.module.rules;
    rules.forEach((rule) => {
      const { test: reg, use } = rule;
      let index = use.length - 1;
      if (reg.test(modulePath)) {
        (function normalLoader() {
          // 后边是一个绝对路径
          let loader = require(use[index--]);
          content = loader(content);
          if (index >= 0) {
            normalLoader();
          }
        })();
      }
    });

    return content;
  }

  // 解析源码，替换require、提取依赖项
  parse(source, parentPath) {
    // 主要靠AST解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; // 数组依赖
    traverse(ast, {
      CallExpression(p) {
        let node = p.node; // 对应的节点
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          moduleName = './' + path.join(parentPath, moduleName); // 'src/a.js'
          dependencies.push(moduleName);
          // 节点替换
          node.arguments = [t.StringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies };
  }

  /**
   * 构建模块
   * @param {*} modulePath 模块的绝对路径
   * @param {*} isEntry 是否入口文件
   */
  buildModule(modulePath, isEntry) {
    //模块内容
    let source = this.getSource(modulePath);
    // 模块id moduleName  = modulePath - this.root
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryId = moduleName; // 保存入口名字
    }

    // 解析 需要把source源码进行改造  返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );
    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;
    dependencies.forEach((dep) => {
      // 附模块的加载  递归加载
      this.buildModule(dep, false); // 这里dep传的好像不是绝对路径？？
    });
  }

  emitFile() {
    // 发射文件
    // 数据渲染
    // 看的是webpack.config.js中的output
    let main = path.join(this.config.output.path, this.config.output.filename);
    // 读取模板
    let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
    // 渲染
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    // 拿到输出到哪个目录下
    // 资源中 路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    this.hooks.run.call();
    // 编译 调用
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 发射一个文件 打包后的文件
    this.hooks.afterCompile.call();
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}
module.exports = Compiler;
