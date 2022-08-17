const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  //关闭eslint校验工具
  lintOnSave: false,
  //代理跨域
  // devServer: {
  //   proxy: {
  //     target: "https://elm.cangdu.org",
  //     secure: false,
  //   },
  // },
});
