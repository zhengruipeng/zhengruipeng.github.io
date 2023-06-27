import {notify} from "../public/notification/notification.js";
import {MyApp} from "../public/config.js";

document.addEventListener("DOMContentLoaded",function () {
    const votePageContainer = this.querySelector("#vote-page-container");
    if(!sessionStorage.getItem("username")){
        notify.print("登录超时");
        location = "../web-pages/login.html";
        return false;

    }

    fetch2("../main/CheckVoteInfo",{
        method:"get",
    })
        .then(response => response.json())
        .then(json => {
            /*
            *
            *
                * */
            console.log(json);


            // console.log(map);
            let counter = 0;
            for (let name in json) {
                if(++counter >= 7)break;

                let p = document.createElement("p");
                p.innerHTML = name+": "+json[name]+"票";

                votePageContainer.appendChild(p);
                // MyApp.customEvent.dispatchEvent("infoinit");
            }
        });


});