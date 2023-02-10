import React from "react"
import PropTypes from "prop-types"

let Test = function (){
    return <div>
        {
            (_ => {
                let res = "";
                for(let param in arguments[0]){
                    res += `${param}: ${arguments[0][param]}`
                }
                return res;
            })()
        }
    </div>
}
Test.propTypes = {
    //必填
    a:PropTypes.array.isRequired,
};
//默认值
//这种写法已经淘汰，一般用es6的写法
Test.defaultProps = {
    b:10,
}
let Test2 = class extends React.Component{
    static defaultProps = {
        a:10,
    };
    static defaultProps;
    static {
        this.defaultProps = {
            c:30,
        }
    }
    render(){
        return <div>
            {
                (_ => {
                    let res = "";
                    for(let param in this.props){
                        res += `${param}: ${this.props[param]}`
                    }
                    return res !== ""?res:"参数为空";
                })()
            }
        </div>
    }
}
Test2.defaultProps = {
    b:20
}
let App = class extends React.Component{

    render(){
        return <>
            <Test a={[1,2,3]}></Test>
            <Test2></Test2>
        </>
    }
};

export default App;

/*学到50*/