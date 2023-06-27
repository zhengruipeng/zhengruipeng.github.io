import {MyApp} from "../public/config.js";
document.addEventListener("DOMContentLoaded",function () {
    let occupation = sessionStorage.getItem("occupation");
    let username = sessionStorage.getItem("username");
    if(!occupation || !username){
        notify.print("登录超时");
        location = "../web-pages/login.html";
        return false;
    }
    let limitItems = [];
    if(occupation === "student"){
        limitItems.push(document.getElementById("course-teacher-nav"));
        limitItems.push(document.getElementById("account-manager"));
        limitItems.push(document.getElementById("other-manager"));
        limitItems.push(document.getElementById("my-course"));
        limitItems.push(document.getElementById("change-select-course"));
        limitItems.push(document.getElementById("course-vote-manage"));
    }else if(occupation === "teacher"){
        limitItems.push(document.getElementById("course-table-nav"));
        limitItems.push(document.getElementById("account-manager"));
        limitItems.push(document.getElementById("student-course"));
        limitItems.push(document.getElementById("other-manager"));
        limitItems.push(document.getElementById("course-vote-manage"));

    }else if(occupation === "manager"){
        limitItems.push(document.getElementById("course-vote-nav"));
    }

    limitItems.forEach(/*HTMLElement*/item => {
        item.parentElement.removeChild(item);
    })
});
