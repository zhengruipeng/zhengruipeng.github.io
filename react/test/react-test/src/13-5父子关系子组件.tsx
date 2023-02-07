// @ts-ignore
import React, {ReactNode} from "react";

let SonF = function (props):React.ReactElement{
    console.log(props)
    return <div>我是函数子组件{props.data}</div>
}
class SonC extends React.Component{
    render():React.ReactNode{
        //this.props就相当于实例的属性对象
        // @ts-ignore
        console.log(this.props)
        // @ts-ignore
        return <><div>我是类子组件{this.props.data}</div>
        </>
    }
}

export {SonF,SonC}
//--target 'es6' --jsx