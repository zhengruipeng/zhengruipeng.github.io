import {MyApp} from "../config/config.js";

document.addEventListener("DOMContentLoaded",function main(){

    let editingEle = null;

    let dblclick = function (){
        const td = this;
        //第一列不修改
        if(td.children[0])return false;
        //ID不做修改
        // if(td.parentNode.children[1] === td)return false;
        if(td.parentNode.querySelector("."+MyApp.tableCols[0]) === td)return false;

        //修改元素的时候把上一个修改的元素值确定好
        if(editingEle)editingEle.innerText = editingEle.children[0]?.innerText?editingEle.children[0].innerText:editingEle.innerText;

        let content = this.innerText;
        let input = document.createElement("div");
        input.innerText = content;
        td.innerText = "";
        td.appendChild(input);
        input.contentEditable = true;

        editingEle = this;
    };
    MyApp.customEvent.addListener("tableinit",function () {
        console.log(4);

        const table = document.querySelector("table");
        const tds = table.querySelectorAll("td");
        tds.forEach(function (td) {
            td.ondblclick = dblclick;
        })
        MyApp.eventFunctions.tdDblClick = dblclick;
    });
})