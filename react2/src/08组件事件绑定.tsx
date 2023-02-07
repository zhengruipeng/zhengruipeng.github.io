import { ReactNode } from "react";
import React = require("react");
//@ts-ignore
let clickCB = function (ev:MouseEvent):void{
    ev.preventDefault();
    alert(123);
};

let buttonStyle = {
    padding:"7px 15px",
    margin:"20px",
    display:"inline-block"
}

let FnCom = function ():React.ReactElement{
    //@ts-ignore
    return (<div onClick={clickCB} style={buttonStyle}>函数组件</div>);
};
let ClassCom = function ():void{

};
ClassCom.prototype.constructor = ClassCom;
//@ts-ignore
ClassCom.prototype = new React.Component();
ClassCom.prototype.render = function ():React.ReactElement{
    //@ts-ignore
    return (<div onContextMenu={clickCB} style={buttonStyle}>类组件</div>)
};
let ClassCom2 = class extends React.Component{
    render():React.ReactElement{
        //@ts-ignore
        return (<div onContextMenu={clickCB} style={buttonStyle}>类组件</div>)
    }
}

let App = function ():ReactNode{
    // @ts-ignore
    return (<div><FnCom /><ClassCom /></div>)
};

export default App;
