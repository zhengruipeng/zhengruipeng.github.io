import React from 'react'
import { Link } from 'react-router-dom'
function Left (){
	return (
		<div className="left">
			<Link to="/test1">练习1</Link><br/>
			<Link to="/test2?id=aaa">练习2</Link><br/>
			<Link to="/test3?id=aaa">练习3</Link><br/>
			<Link to="/test4">练习4</Link>
		</div>
	)
}
export default Left;