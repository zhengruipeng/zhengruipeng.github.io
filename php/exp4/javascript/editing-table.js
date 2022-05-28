import {MyApp} from "./config.js";

document.addEventListener("DOMContentLoaded",function main(){

    let editingEle = null;

    let dblclick = function (){
        const td = this;
        if(td.children[0])return false;

        if(editingEle)editingEle.innerHTML = editingEle.children[0]?.innerHTML?editingEle.children[0].innerHTML:editingEle.innerHTML;

        let content = this.innerHTML;
        let input = document.createElement("div");
        input.innerHTML = content;
        td.innerHTML = "";
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