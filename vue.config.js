const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        ws:false,
        target: 'http://localhost:8088',
        pathRewrite:  {'^/api': ''},
        // ws: true, // 支持 websocket
        changeOrigin: true // true 表示改变起源（让目标服务器不知道真正的起源）
      },
    }
  },
  lintOnSave: false //关闭eslint检查
})
