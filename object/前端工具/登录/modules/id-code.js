//引入插件，注意路径的正确
import {IdentifyingCode} from "../functions/Identifying-code/Identifying-code.js";
import {formControl} from "./init.js";
import {MyApp} from "../public/config.js";
//初始加载

document.addEventListener("DOMContentLoaded",function (){

    //获取HTML标签
    const idCodeInput = formControl[0].formElement.querySelector("#id-code");
    const container = formControl[0].formElement.querySelector("#id-code-container");

    let createCode = function (){
        //创建一个验证码实例
        let ic = new IdentifyingCode();

        //生成一个六位的验证码，可修改
        ic.initRandomCode(6);

        //ic.encrypt()对验证码进行加密，异步进行
        ic.encrypt().then(_ => {
            //ic.gui(width,height)生成验证码的图片，第一个参数是图片宽度，第二个参数是高度
            ic.gui(150, 75).then(canvas => {
                //向body中添加生成的图片
                container.appendChild(canvas);
                canvas.onclick = function (){
                    this.parentElement.removeChild(this);
                    createCode();
                };

                MyApp.ic = ic;

            })
        });
    };
    createCode();


});


