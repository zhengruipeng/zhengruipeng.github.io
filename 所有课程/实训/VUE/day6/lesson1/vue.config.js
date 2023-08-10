/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/


//vue.config.js
//此内容为VueCli的配置文件
module.exports = {
  //publicPath为项目在构建之后引入的头部路径
  //process.env.NODE_ENV代表当前构建时的环境名称
  //production为生产环境即运行npm run build时process.env.NODE_ENV的值为production
  //development为开发环境即运行npm run serve时process.env.NODE_ENV的值为development
  publicPath:process.env.NODE_ENV === 'production'? '':'/',
  //lintOnSave是关闭脚手架的代码格式校验保证不会因为代码编写风格报错
  lintOnSave:false
}
