import React from "react";

let SonF = function ():React.ReactElement{
    return <div>我是函数子组件</div>
}
class SonC extends React.Component{
    render():React.ReactElement{
        return <>
            <div>我是类子组件</div>
        </>
    }
}

export {SonF,SonC}
//--target 'es6' --jsx