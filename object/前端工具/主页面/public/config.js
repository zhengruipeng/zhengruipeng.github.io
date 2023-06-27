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
                console.error("no callback found ："+event);
            }
        }
    },
    data:{},
    database:null,
    eventFunctions:{
        addStudent:null,
        deleteItem:null,
        insertTr:null,
        tdDblClick:null,
        tdMouseMove:null,
        selected:null,
        update:null,
    },
    handlePage:"",
    studentsInformation:[],
    table:"",
    /*假定：表格生成顺序永远与次数组顺序一致*/
    /*假定：表格第一位永远是主键*/
    tableCols /*string[]*/:[],
    tableKey:"",
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
