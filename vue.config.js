const path = require('path')
// 拼接路径
function resolve(dir) {
  return path.join(__dirname , dir)
}

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias.set('@' , resolve('src'))
  }
}