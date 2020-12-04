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
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV == 'production') {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    config["performance"] = {
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
    config["externals"] = IS_PROD ? {
      'vue': 'Vue',
      'vuex': 'Vuex',
      "element-ui": "ELEMENT",
      'echarts': 'echarts',
    } : {}
  }
}