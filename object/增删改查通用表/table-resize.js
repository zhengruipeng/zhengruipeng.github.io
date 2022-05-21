import {MyApp} from "./config.js";
document.addEventListener("DOMContentLoaded",function (){
    const table = this.querySelector("table");
    const colgroup = this.querySelector("table>colgroup");
    const cols = colgroup.children;
    const tds = table.querySelectorAll("td");
    let seleStart = function (ev){ev.preventDefault()}
    let mousemove = function (ev){
        let td = this;
        let x = ev.clientX;
        let y = ev.clientY;
        let clientRect = td.getBoundingClientRect();
        let {left,top,width,height} = clientRect;
        if(x-left>width-3){

            td.style.cursor = "col-resize";
            td.onmousedown = function (ev){
                document.body.addEventListener("selectstart",seleStart);
                let mousemoveFun = td.onmousemove;
                window.onmousemove = function (ev){
                    let cellIndex = td.cellIndex;
                    cols[cellIndex].style.width = ev.x - x + width +"px";
                };
                window.onmouseup = function (){
                    this.onmousemove = mousemoveFun;
                    window.onmousemove = null;
                    td.onmousedown = null;
                    window.onmouseup = null;
                    document.body.removeEventListener("selectstart",seleStart);

                    let cellIndex = td.cellIndex;
                    let rowIndex = td.parentNode.rowIndex-1;
                    // td.style.width = "0px";

                }
            }
        }else if(y-top>height-3){
            td.style.cursor = "row-resize";
            td.onmousedown = function (ev){
                td.parentNode.style.transitionDuration = "0s";
                document.body.addEventListener("selectstart",seleStart);
                let mousemoveFun = td.onmousemove;
                window.onmousemove = function (ev){
                    let rowIndex = td.parentNode.rowIndex-1;
                    td.parentNode.style.height = ev.y-y + height +"px";
                };
                window.onmouseup = function (){
                    this.onmousemove = mousemoveFun;
                    window.onmousemove = null;
                    td.onmousedown = null;
                    window.onmouseup = null;
                    document.body.removeEventListener("selectstart",seleStart);
                    td.parentNode.style.transitionDuration = MyApp.cssAttribute.transitionDuration;
                }
            }
        }else{
            td.style.cursor = "pointer";
        }
    };
    tds.forEach(function (td){
        td.onmousemove = mousemove;
    });
    window.onresize = function (){
        tds.forEach(td => {
            let {width,height} = td.getBoundingClientRect();
            td.style.width = width+"px";
            td.style.height = 0+"px";
        })
    };
    MyApp.eventFunctions.tdMouseMove = mousemove;

});
