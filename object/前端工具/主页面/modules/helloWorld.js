import {MyApp} from "../public/config.js";
document.addEventListener("DOMContentLoaded",function (){


    MyApp.customEvent.addListener("tableinit",function () {
        console.log(12);

        const table = document.querySelector("table");
        const tbody = table.querySelector("tbody");
        const asideLogoBtn = document.querySelector("#aside-logo");
        // const  = document.querySelector("#select-all");
        const aside = document.querySelector("aside");
        const menu = document.querySelector(".menu");
        const informationForm = document.querySelector(".information-form");
        const main = document.querySelector("main");
        const nextBtn = document.getElementById("next-page");

        /*
        * <li class="menu-item" id="delete-selected">删除所有选中</li>
        * */

        //添加信息摁扭
        const addStudentBtn = document.createElement("li");
        addStudentBtn.id = "add-student";
        addStudentBtn.className = "menu-item";
        addStudentBtn.innerText = "hello";

        addStudentBtn.onclick = function (){
            alert("hello");
        };
        menu.appendChild(addStudentBtn);



    });
})