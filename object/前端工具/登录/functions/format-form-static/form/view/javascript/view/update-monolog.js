import {MyApp} from "../../../../../../public/config.js"
import {notify} from "../view/notification.js";
import {io} from "../view/output-info-into-panel.js";
import {map as monologKeyMap} from "../monolog/dataUpdateMonologKeyMap.js";
import {dataUpdateMonologWriter} from "../monolog/dataUpdateMonologWriter.js";

document.addEventListener("DOMContentLoaded",function main(){


    let initTableWith2dArr = function (arr2d){
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        table.appendChild(tbody);
        let fragment = document.createDocumentFragment();
        arr2d.forEach(row => {
            let tr = document.createElement("tr");
            row.forEach(col => {
                let td = document.createElement("td");
                td.innerHTML = col;
                tr.appendChild(td);
            })
            fragment.appendChild(tr);
        });
        tbody.appendChild(fragment);
        return table;
    };


    MyApp.customEvent.addListener("tableinit",function () {
        console.log(7);

        //            <li class="menu-item" id="update-monolog">更新日志</li>
        // const updateMonologBtn = document.querySelector("#update-monolog");
        const asideDisplay = document.querySelector("#aside-display");
        const informationForm = document.querySelector("#aside-container>ul.information-form");
        const menu = document.querySelector(".menu");


        const updateMonologBtn = document.createElement("li");
        updateMonologBtn.id = "update-monolog";
        updateMonologBtn.className = "menu-item";
        updateMonologBtn.innerText = "更新日志";
        menu.appendChild(updateMonologBtn);


        let showMonolog = async function (){

            let operationArr = dataUpdateMonologWriter.read();
            let arr2d = [[]];

            if(operationArr.length === 0)return false;

            //获取表头
            Object.keys(operationArr[0]).forEach(key => {
                arr2d[0].push(monologKeyMap.get(key));
            });

            //获取表格元素
            operationArr.forEach(operation => {
                let temp = [];
                for(let name in operation){
                    if(typeof operation[name] === "object"){
                        let res = Object.keys(operation[name]).slice(0,3).join()
                        Object.keys(operation[name]).length>3?res += "..." : res;
                        temp.push(res);
                        break;
                    }
                    temp.push(operation[name]);
                }
                arr2d.push(temp);
            });

            let table = initTableWith2dArr(arr2d);

            asideDisplay.innerHTML = "";
            asideDisplay.appendChild(table);
            asideDisplay.classList.remove("aside-display-close");
            asideDisplay.classList.add("aside-display-open");
        };


        updateMonologBtn.addEventListener("click",function (){
            informationForm.innerHTML = "";
            informationForm.classList.remove("information-form-close");
            informationForm.classList.add("information-form-open");
            menu.classList.remove("menu-open");
            menu.classList.add("menu-close");


            let submitBtn = document.createElement("button");
            submitBtn.innerHTML = "查看日志";
            submitBtn.classList.add("information-form-item");
            submitBtn.style.cursor = "pointer";
            informationForm.appendChild(submitBtn);
            submitBtn.onclick = async function (){
                await showMonolog();
                // cancelBtn.click();
            };


            let cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "返回";
            cancelBtn.classList.add("information-form-item");
            cancelBtn.style.cursor = "pointer";
            informationForm.appendChild(cancelBtn);
            cancelBtn.onclick = function (){
                informationForm.classList.add("information-form-close");
                informationForm.classList.remove("information-form-open");
                menu.classList.add("menu-open");
                menu.classList.remove("menu-close");
                asideDisplay.classList.remove("aside-display-open");
                asideDisplay.classList.add("aside-display-close");
            };

        })

    });
})