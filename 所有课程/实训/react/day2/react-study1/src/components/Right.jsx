import React from 'react'
import {Route} from 'react-router-dom'
//定义子路由的方式
import Test1 from '../views/test/Test1.jsx'
import Test2 from '../views/test/Test2.jsx'
import Test3 from '../views/test/Test3.jsx'
import Test4 from '../views/test/Test4.jsx'
function Right (){
	//如果在right中追加页面就参考test1和test2的方式即可
	return (
		<div className="right">
			<Route path="/test1" component={Test1}/>
			<Route path="/test2" component={Test2}/>
			<Route path="/test3" component={Test3}/>
			<Route path="/test4" component={Test4}/>
		</div>
	)
}
export default Right;