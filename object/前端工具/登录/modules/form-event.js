import {formControl} from "./init.js";
import {notify} from "../public/notification/notification.js";
import {IdentifyingCode, currentCode} from "../functions/Identifying-code/Identifying-code.js"
import {MyApp} from "../public/config.js";

document.addEventListener("DOMContentLoaded", async function () {
    const loginBtn = formControl[0].formElement.querySelector("#login");
    const forgetPwdBtn = formControl[0].formElement.querySelector("#forget-pwd");
    const backImage = document.getElementById("background-image");


    //获取HTML标签
    const idCodeInput = formControl[0].formElement.querySelector("#id-code");
    const container = formControl[0].formElement.querySelector("#id-code-container");


    window.onmousemove = function (ev) {
        let {x, y} = ev;
        let {left, top, height, width} = formControl[0].formElement.getBoundingClientRect();
        let [cx, cy] = [left + width / 2, top + height / 2];
        let {clientWidth, clientHeight} = document.documentElement;
        let [dx, dy] = [cx - x, cy - y];
        let dis = Math.hypot(dx, dy);
        let b = Math.max(-1 * 30 / clientHeight * dis + 30, 0);
        backImage.style.filter = "blur(" + b + "px)";

    }

    loginBtn.onclick = async function () {
        let username = formControl[0].formElement.querySelector("input[name='username']").value;
        let password = formControl[0].formElement.querySelector("input[name='password']").value;
        let idCode = formControl[0].formElement.querySelector("#idCode");
        let occupationInputs = Array.from(formControl[0].formElement.querySelectorAll("input[name='occupation']"));
        // console.log(occupationInputs.filter(input => input.checked))

        let occupation = occupationInputs.filter(input => input.checked)[0]?.value;

        if (!username || !password || !occupation) {
            notify.print("请填写完整信息");
            return false;
        }
        let code = idCodeInput.value;
        if (!MyApp.ic) {
            notify.print("验证码还没好，稍等一下");
            return false;

        }
        let res = await MyApp.ic.check(code);
        //输出
        if (!res) {
            notify.print("验证码错误");
            return false;

        }

        fetch("../login/CheckLogin", {
            body: new FormData(formControl[0]),
            method: "post",
        }).then(response => response.text())

            .then(text => {
                if (text.indexOf("success") !== -1) {
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("occupation", occupation);

                    location = "./main.html?username=" + username + "&occupation=" + occupation;

                } else {
                    notify.print("密码错误，请再次尝试登录");

                }
            })
    };
    /*    forgetPwdBtn.onclick = function (){
            location = "./forget-pwd.html";

        };*/

});