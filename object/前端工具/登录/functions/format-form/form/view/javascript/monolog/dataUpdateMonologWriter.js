import {dataUpdateMonolog} from "./dataUpdateMonolog.js";

let dataUpdateMonologWriter;
(function (){
    let write = function (method,id,tableName,params){
        dataUpdateMonolog.push({method,id,tableName,params});
        return this;
    };
    let read = function (){
        return dataUpdateMonolog;
    }
    let get = function (index,key){
        let res = dataUpdateMonolog[index];
        if(key)res = res[key];
        return res;
    };
    dataUpdateMonologWriter = {write,read,get};
})();
export {dataUpdateMonologWriter};
