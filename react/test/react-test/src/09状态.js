// import React = require("react");
import React from "react"

class App extends React.Component{
    state = {
        a:1,
        b:2,
        innerHTML:<p>123</p>,
    };

    changeA = (that) => {
        this.setState({
            a:this.state.a+1,
            b:this.state.b,
            innerHTML: this.state.innerHTML
        });

        console.log(this);
        document.getElementById("a").innerText = "a的值已经改成"+this.state.a;
    }

    delB = function (that){
        console.log(this);

        let temp = {
            a:this.state.a,
            innerHTML: this.state.innerHTML
        };

        this.setState(temp);

        document.getElementById("b").innerText = "b的值已经删除";
    }

    bindEvent(){
        const buttona = document.getElementById("buttona");
        const buttonb = document.getElementById("buttonb");

        let that = this;
        buttona.addEventListener("click",function (){
            that.changeA.call(that,this);
        });
        buttonb.addEventListener("click",function (){
            that.delB.call(that,this);
        });
    }

    render(){
        return (
            <div>
                <span id="a">a{this.state.a}</span>
                <span id="b">b{this.state.b}</span>
                {this.state.innerHTML}
                <button id="buttona" onClick={this.changeA}>更改A</button>
                <button id="buttonb" onClick={this.delB.bind(this)}>删除B</button>
            </div>
        );
    }
}

export default App