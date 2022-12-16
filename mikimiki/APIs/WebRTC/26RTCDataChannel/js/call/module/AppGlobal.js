/*
* 本模块用于协调其他模块进行工作，主要在无法创建模块的时候
* 起到一个全局变量的作用
* */

/*
* 当有些脚本内的函数没有准备好的时候
* 将方法设置为此值，来设置一个默认返回事件通知用户时序错误
* */

let defaultCallBack = function (){
    console.error("调用函数并没有经过初始加载");
}

//全局变量使用模块
let AppGlobal = {
    //打电话用的控制时间的工具函数的书写位置
    callTimer: {
        start: defaultCallBack,
        stop: defaultCallBack,
        reset: defaultCallBack
    },

    RTCConnection:null,
    wsConnection:null,
    callingState:null,

    beforeAddTrack:null,

    isCaller:null,
};

export {AppGlobal}