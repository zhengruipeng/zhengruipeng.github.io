let MyApp = {
    asideMode:true,
    cssAttribute:{
        transitionDuration:".3s"
    },
    customEvent:{
        /*click:[fun1,fun2,fun3]*/
        //databaseOnSuccess
        //tableinit
        addListener(event,listener) {
            // console.log(event,this[event]);
            if(this[event])
                this[event].push(listener);
            else{
                this[event] = [listener];
            }
        },
        dispatchEvent(event) {
            let that = this;
            let cbs = this[event];
            if(cbs){
                cbs.forEach(cb => {
                    cb.call(that,{
                        name:event
                    })
                })
            }else{
                console.warn("no callback found ："+event);
            }
        }
    },
    data:{},
    database:null,
    eventFunctions:{},
    studentsInformation:[],
};
export {MyApp};



/*自定义事件使用方法
* import {MyApp} from "./config.js";

    MyApp.customEvent.addListener("load",function (){
        console.log(123);
    });
    window.onload = function (){
        MyApp.customEvent.dispatchEvent("load");
    }
    *
    * */
