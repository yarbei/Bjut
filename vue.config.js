//vue.config.js
module.exports = {
   devServer: {
     proxy: {
       '/api': {
         target: 'http://47.95.227.250/app/gt/index.php', //对应自己的接口
         changeOrigin: true,
         ws: true,
         // changeOrigin: false,   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
         pathRewrite: {
           '^/api': ''
         }
       }
     }
   }
 }