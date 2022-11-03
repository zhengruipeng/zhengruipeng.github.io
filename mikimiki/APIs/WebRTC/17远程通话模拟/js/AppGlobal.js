let defaultCallBack = function (){
    console.error("调用函数并没有经过初始加载");
}

let AppGlobal = {
    callTimer: {
        start: defaultCallBack,
        stop: defaultCallBack,
        reset: defaultCallBack
    }
};

export {AppGlobal}