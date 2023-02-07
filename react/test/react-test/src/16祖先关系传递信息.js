import React from "react";
import {createContext} from "react";

const {Provider,Consumer} = createContext();

let A = function ()/*React.ReactElement*/ {
    return <div>我是A
        <B></B>
    </div>
};

let B = function ()/*React.ReactElement*/ {
    return <div>我是B
        <Consumer>{value => {
            console.log("信息已经获取"+value)
            return <span>，信息是：{value}</span>
        }
        }</Consumer>
    </div>
}

class App extends React.Component {
    state = {
        msg: "msg"
    };

    render()/* React.ReactElement*/ {
        return <>
            <Provider value={this.state.msg}>
                <A></A>
            </Provider>
        </>

    }
}

export default App
/*学到43课*/