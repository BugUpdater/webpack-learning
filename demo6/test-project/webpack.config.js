const path = require('path');
const Plugin1 = require('./plugin/plugin1.js');
const Plugin2 = require('./plugin/plugin2.js');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader'),
        ],
      },
    ],
  },
  plugins: [new Plugin1(), new Plugin2()],
};
