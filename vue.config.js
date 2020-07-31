const path = require('path')
// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  lintOnSave: false,
  // productionSourceMap: !IS_PROD, // 生产环境的 source map
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'));
  },
  configureWebpack: {
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    externals:IS_PROD ? {
      'vue': 'Vue',
      'vuex': 'Vuex',
      "element-ui": "ELEMENT",
      'echarts': 'echarts',
      // 'jquery': 'jquery'
    } : {},
    performance: {
      hints: "warning", // 枚举

      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 15000000,

      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 15000000, 

      // 只给出 css js 文件的性能提示
      assetFilter: function(assetFilename) {

        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

      }
    }
  }
}