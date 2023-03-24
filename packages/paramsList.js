let paramsList = function (...params){
    let arr = params;
    return {
        getParam(index){
            return arr[index] || false;
        },
        setParam(index,value){
            return arr[index] = value;
        },
        getRes(split){
            return arr.join(split);
        }
    }
}
export {paramsList};