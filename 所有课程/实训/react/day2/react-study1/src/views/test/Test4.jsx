import React,{useState,useEffect} from 'react'

function Test3(props){
	
	useEffect(()=>{
		console.log(props.location)
		let query = props.location.query;
		console.log('从test3接到的参数',query)
		
	},[])
	const handleJump = () => {
		// props.history同样具备go方法来实现前进和后退
		props.history.go(-1)
	}
	return (
		<div>
			text3
			<button onClick={handleJump}>返回</button>
		</div>
	)
}
export default Test3