import React from 'react'
//引入hash模式的路由
import {HashRouter,Route} from 'react-router-dom'
//引入路由的中的欢迎页面
import Index from '../views/Index.jsx'
function GlobalRouter(){
	//react-router的路由定义是通过jsx格式的脚本来实现的，并且与vue的路由有很大部分的不同，
	//他并没有对全局的this挂载任何对象，所以使用路由时我们要着重的注意一下
	return (
		<HashRouter >
			<Route path="/" component={Index}>
			</Route>
		</HashRouter>
	)
}
export default GlobalRouter