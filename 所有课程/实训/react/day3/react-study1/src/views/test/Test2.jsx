import React,{useState,useEffect}from 'react'
function Test2(){
	
	const [count,setCount] = useState(0)
	// useEffect回调后如果传[]那么这个回调只会在组件初始化时才会执行相当于mounted
	useEffect(()=>{
		console.log('我只执行一次')
	},[])
	// useEffect后面如果不传参数，他就会监听每一次页面更新相当于updated
	useEffect(()=>{
		console.log('只要有更新我就会执行')
	})
	//在第二个参数传入 state变量的值就可以实现监听指定变量，当变量发生变化时他就会执行
	//相当于watch
	useEffect(()=>{
		console.log('只要count发生变化我就会执行')
	},[count])
	
	
	const handlePlus = () => {
		setCount(count+1)
	}
	const handleSub = () => {
		setCount(count-1)
	}
	return (
		<div>
			<h4>useEffect的学习</h4>
			<div>
				<button onClick={handlePlus}>+</button>
				{count}
				<button onClick={handleSub}>-</button>
			</div>
		</div>
	)
}
export default Test2;