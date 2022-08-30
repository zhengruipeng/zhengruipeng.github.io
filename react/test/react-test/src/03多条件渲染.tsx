import { ReactNode } from "react";

let getRandom = function (start,length):Number{
    return start+Math.floor(Math.random()*length);
}

const App = function ():Object{
    const rand:Number = getRandom(1,3);
    let targetEle:ReactNode = null;
    if(rand === 1){
        targetEle = <h1>h1</h1>
    }else if(rand === 2){
        targetEle = <h2>h2</h2>
    }else if(rand === 3){
        targetEle = <h3>h3</h3>
    }
    return (
        <div>
            {targetEle}
        </div>
    )
};

export default App;