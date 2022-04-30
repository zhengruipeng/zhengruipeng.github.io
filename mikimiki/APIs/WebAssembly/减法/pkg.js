mergeInto(LibraryManager.library,{
    js_sub:function (a,b){
        return a-b;
    },
    js_console_log_int:function (a) {
        console.log("js output:"+a);
    }
})