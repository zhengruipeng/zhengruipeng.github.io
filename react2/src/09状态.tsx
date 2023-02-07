import React = require("react");

class App extends React.Component{
    state = {
        a:1,
        b:2,
        innerHTML:<p>123</p>,

    };
    changeA():void{
        this.setState({
            ...this.state,
            a:this.state.a+1
        });
        document.getElementById("a").innerText = "a的值已经改成"+this.state.a;

    }

    delB():void{
        let temp:Object = {
            ...this.state,
        };
        // @ts-ignore
        delete temp.b;

        this.setState(temp);

        document.getElementById("b").innerText = "b的值已经删除";
    }
    render():React.ReactElement{
        return (
            <div>
                <span id="a">a{this.state.a}</span>
                <span id="b">b{this.state.b}</span>
                {this.state.innerHTML}
                <button onClick={this.changeA}>更改A</button>
                <button onClick={this.delB}>删除B</button>
            </div>
        );
    }
}

export default App