const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = "HtmlAfterWebpackPlugin";
const chalk = require("chalk");

// 获取静态资源的帮助函数
const assetsHelp = data => {
  let js = [];
  const getAssetsName = {
      js: item => `<script src="${item}"></script>`
  }
  for (let jsItem of data.js) {
      js.push(getAssetsName.js(jsItem));
  }
  return { js };
}

class HtmlAfterWebpackPlugin {
  constructor () {
    this.jsArr = [];
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      console.log(chalk.blue("webpack 构建过程开始！"));

      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
            const { js } = assetsHelp(data.assets); // 获取 js
            this.jsArr = js;
            console.log(js);
            cb(null, data);
        }
      )

      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
            // data 里就是 beforeEmit 这个钩子能拿到的信息
            // 有几个 chunk 就会输出几块信息
            // console.log(data);
            let _html = data.html;
            _html = _html.replace('<!-- injectjs -->', this.jsArr.join(''));
            data.html = _html;
            cb(null, data);
        }
      )
    });
  }
}

module.exports = HtmlAfterWebpackPlugin;
