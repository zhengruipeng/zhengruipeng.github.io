import React from "react";
import {SonC, SonF} from "./13-5父子关系子组件.js";

class App extends React.Component{
    render():React.ReactElement{
        return <>
            <SonF />
            <SonC />
        </>
    }
}

export default App