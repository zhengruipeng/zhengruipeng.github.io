import React from "react"

let App = class extends React.Component{
    state = {
        value :"message"
    };

    onValueHandler(ev){
        let that = ev.target||ev.srcElement;

        this.setState({
            ...this.state,
            value:that.value,
        });
    }

    checkState(){
        console.log(this.state);
    }

    render(){
        return (
            <>
                <input type="text" onChange={this.onValueHandler.bind(this)} value={this.state.value} name="text1" />
                <input type="button" onClick={this.checkState.bind(this)} value="检查" />
            </>
        )
    }
}

export default App