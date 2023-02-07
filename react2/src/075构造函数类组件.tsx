import { ReactNode,ReactElement } from "react";
import React = require("react");

let App = function (){

}
App.prototype.constructor = App;
// @ts-ignore
App.prototype = new React.Component();
App.prototype.render = function ():React.ReactElement{
    return (
        <div>
            构造函数类组件
        </div>
    );
};
export default App;

