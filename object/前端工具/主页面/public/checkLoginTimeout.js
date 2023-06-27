import {notify} from "./notification/notification.js";

document.addEventListener("DOMContentLoaded",function (){
    let occupation = sessionStorage.getItem("occupation");
    let username = sessionStorage.getItem("username");

    if(!occupation || !username){
        notify.print("登录超时");
        location = "../web-pages/login.html";
        return false;
    }
})