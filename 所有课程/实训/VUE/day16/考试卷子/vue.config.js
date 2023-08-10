module.exports = {
  publicPath:process.env.NODE_ENV === 'production'?'':'/',
  lintOnSave:false,
	// 配置反向代理，所有访问在/shop-service/v1的地址全都转发到http://localhost:3000这个地址上
	devServer: {
	  proxy: {
	    '/shop-service/v1': {
	      target: 'http://localhost:3000',
	      changeOrigin: true
	    }
	  }
	}
}
