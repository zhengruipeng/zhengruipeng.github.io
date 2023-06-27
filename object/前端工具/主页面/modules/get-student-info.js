import {keyWord,keywordTitleMap} from "./keyword-title-map.js";
import {notify} from "../public/notification/notification.js";
import {MyApp} from "../public/config.js";

document.addEventListener("DOMContentLoaded",function () {
    const memorandumPageContainer = this.querySelector("#memorandum-page-container");
    const informationPageContainer = this.querySelector("#information-page-container");
    const usernameContainer = memorandumPageContainer.querySelector("h1>span");
    const infoContainer = informationPageContainer.querySelector("dl");
    if(!sessionStorage.getItem("username")){
        notify.print("登录超时");
        location = "../web-pages/login.html";
        return false;

    }

    fetch2("../main/CheckStudentInfo?username="+sessionStorage.getItem("username")+"" +
        "&occupation="+sessionStorage.getItem("occupation")+"",{
        method:"get",
    })
        .then(response => response.json())
        .then(json => {
            /*
            * birthday: "此字段输入生日"
                department: "此字段输入院系或专业"
                gender :  "此字段输入性别"
                id :  "此字段输入ID"
                occupation: "student"
                position: "此字段输入职位"
                startTime:  "此字段输入入学时间"
                username : "此字段输入用户名"
                * */
            console.log(json);
            usernameContainer.innerHTML = "，" + json.username;


            // console.log(map);

            for (let name in json) {
                if(!keyWord.includes(name))continue;
                if(name === "id")continue;
                if(name === "occupation")continue;


                let dt = document.createElement("dt");
                let dd = document.createElement("dd");
                dt.dataset.title = name;
                dt.innerHTML =  typeof keywordTitleMap.get(name) === "function"?
                    keywordTitleMap.get(name)(sessionStorage.getItem("occupation")):
                    keywordTitleMap.get(name);
                dd.innerHTML = json[name];
                if(name === "username"){
                    dd.contentEditable = true;
                }
                dd.dataset.title = name;
                console.log(json[name]);
                if(json[name].trim() !== "无效字段"){
                    infoContainer.appendChild(dt);
                    infoContainer.appendChild(dd);
                }
            }
            MyApp.customEvent.dispatchEvent("infoinit");

        });


});