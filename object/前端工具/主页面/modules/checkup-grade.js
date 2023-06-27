import {MyApp} from "../public/config.js";
import {map as gradeTitleMap} from "./grade-title-map.js"
document.addEventListener("DOMContentLoaded",function (){
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
        console.log(12);

        const table = document.querySelector("table");
        const menu = document.querySelector(".menu");
        const informationForm = document.querySelector(".information-form");

        //添加信息摁扭
        const addStudentBtn = document.createElement("li");
        addStudentBtn.id = "add-student";
        addStudentBtn.className = "menu-item";
        addStudentBtn.innerText = "查看当前课程成绩";

        menu.appendChild(addStudentBtn);

        const asideDisplay = document.querySelector("#aside-display");


        let showMonolog = async function (){
            let cb;
            fetch2("../../../../main/CheckCourseGrade"+location.search,{
                method:"get",
            }).then(response => response.text())
                .then(cb = text => {
                    try {
                        const div = document.createElement("div");
                        div.innerHTML = text;

                        let json = JSON.parse(div.innerText);

                        let arr2d = [[]];
                        //获取表头
                        Object.keys(json[0]).forEach(key => {
                            arr2d[0].push(gradeTitleMap.get(key));
                        });

                        //获取表格元素
                        for (let n in json) {
                            let operation = json[n];
                            let temp = [];
                            for (let name in operation) {
                                temp.push(operation[name]);
                            }
                            arr2d.push(temp);
                        }

                        let table = initTableWith2dArr(arr2d);


                        asideDisplay.innerHTML = "";
                        asideDisplay.appendChild(table);
                        asideDisplay.classList.remove("aside-display-close");
                        asideDisplay.classList.add("aside-display-open");
                    }catch (e){
                        showMonolog();
                    }
                })
        };


        addStudentBtn.addEventListener("click",async function (){
            informationForm.innerHTML = "";
            informationForm.classList.remove("information-form-close");
            informationForm.classList.add("information-form-open");
            menu.classList.remove("menu-open");
            menu.classList.add("menu-close");
            // await showMonolog();


            let submitBtn = document.createElement("button");
            submitBtn.innerHTML = "查看当前成绩";
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