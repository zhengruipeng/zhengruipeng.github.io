let MyApp = {
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
    cssAttribute:{
        transitionDuration:".3s",
    }

}
export {MyApp};