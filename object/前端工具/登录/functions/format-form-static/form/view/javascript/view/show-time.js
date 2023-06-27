import {MyApp} from "../../../../../../public/config.js"
import {notify} from "../view/notification.js";
import {io} from "../view/output-info-into-panel.js";

document.addEventListener("DOMContentLoaded",function main(){

    MyApp.customEvent.addListener("tableinit",function () {
        console.log(9);



        const dateTimeDisplay = document.getElementById("datetime-display");
        setInterval(function (){
            dateTimeDisplay.innerText = new Date().toLocaleTimeString();
        },1000);
    });
})