// change-personal-info-add
import {MyApp} from "../public/config.js";
import {notify} from "../public/notification/notification.js";

document.addEventListener("DOMContentLoaded",function (){
    const changePersonalInfoAdd = this.querySelector("#change-personal-info-add");
    const informationPageContainer = this.querySelector("#information-page-container");
    const infoListDl = informationPageContainer.querySelector("dl");

    MyApp.customEvent.addListener("infoinit",function (){
        const infoListDt = Array.from(infoListDl.querySelectorAll("dt"));
        const infoListDd = Array.from(infoListDl.querySelectorAll("dd"));


        changePersonalInfoAdd.onclick = function (){
            console.log(notify);
            notify.confirm("你确定提交更改后的个人信息吗").then(res => {
                if(!res)return false;


                let data = {};
                infoListDd.forEach(dd => {
                    data[dd.dataset.title] = dd.innerText;
                });
                console.log(data)

                let formData = new FormData();
                formData.append("info",JSON.stringify(data));
                formData.append("occupation",sessionStorage.getItem("occupation"));
                formData.append("username",sessionStorage.getItem("username"));


                fetch2("../main/ChangePersonalInfo", {
                    method: "post",
                    body: formData,
                    headers: new Headers({
                        "content-type": "application/x-www-form-urlencoded"
                    })
                })
                    .then(response => response.text())
                    .then(text => {
                            console.log(text);
                            if(text.indexOf ("success") !== -1){
                                notify.print("更改成功");
                            }else{
                                notify.print("更改失败");

                            }
                        })
                    .catch(e => {
                            notify.print("更改失败");
                        })
            })
        }
    })

})