import React from 'react'
//函数形式组件由于本身就是构造函数所以他的默认参数就是props
function Top(props){
	console.log(props)
	//由于函数内部作用域就是函数作用域
	//所以这里的所有变量和函数都可以在当前作用域内部直接使用
	//所以相比class的写法，在函数对象中{}取值将不在使用this.进行调用
	//所以函数形式的组件内部不在需求使用this
	return (
		<div className="top">
			{props.name}
		</div>
	)
}
export default Top