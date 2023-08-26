import React from 'react'
// 局部样式的使用方式（相当于vue文件中的scoped方式设置样式）
//import 对象 from xxxx.module.css
//这样引入的css文件就会变成对象需要在对应的标签上
//使用绑定对象的方式绑定
//整个css会变成一个json对象，里面的每一个样式按照
//对象.样式名的形式绑定在标签的className上
import style from './Left.module.css'
console.log(style)
function Left(props){
	return (
		<div className="left">
			{props.name}
			{/*绑定局部样式的方式*/}
			<div className={style.font}>
				局部样式
			</div>
			{/*绑定局部样式的方式，如果样式名带-就采用方括号的形式*/}
			<div className={style['font-red']}>
				局部样式1
			</div>
			{/* 使用了css module方式引用的样式如果不指定元素绑定是没有影响力的 */}
			<div className="font">
				我是不会生效的
			</div>
			<div className={style.yellow}>
				我是黄颜色的字
			</div>
		</div>
	)
}
export default Left