(function (){
    let clarity = document.getElementById("canvasClarity");
    let timer;
    clarity.value = window.localStorage.getItem("canvasClarity") || 10;
    clarity.onchange = function (){
        globalVar.notify("刷新页面后进入新的清晰度");
        window.localStorage.setItem("canvasClarity",this.value);
    };
})()