import { ReactNode } from "react";
import React = require("react");

let ClassComponent = class extends React.Component{
    render():ReactNode{
        return <div>类组件</div>
    }
}

let App = function():ReactNode{
    return <ClassComponent></ClassComponent>;
};

export default App;