import React from "react";


let SonA = function (props)/*React.ReactElement*/ {
    return <div>我是函数子组件A
        <button onClick={props.fetchData.bind(props,"msg A")}>传值</button>
    </div>
};

let SonB = function (props)/*React.ReactElement*/ {
    let msgInput = props.msgInput;

    return <div>我是函数子组件B
        <p>输入信息为{msgInput}</p>
    </div>
}

class App extends React.Component {
    state = {
        msg: undefined
    };

    fetchData(data) {
        let temp;
        this.setState((temp = structuredClone(this.state),temp.msg = data,temp));
    }

    render()/* React.ReactElement*/ {
        return <>
            <SonA fetchData={this.fetchData.bind(this)}></SonA>
            <SonB msgInput={this.state.msg}></SonB>
        </>

    }
}

export default App

/*学到43课*/