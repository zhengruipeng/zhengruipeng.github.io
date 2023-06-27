//引入插件，注意路径的正确
import {Form2Init} from "../functions/gradient-form/form2-init.js";
import {FormUI} from "../functions/gradient-form/form-UI.js";

let formControl = [];
//初始加载
document.addEventListener("DOMContentLoaded",function (){
    const container = this.querySelector("#container");
    //FormInit构造函数接受两个参数，第一个参数是一个子元素的二元数组，
    // 第二个参数是指定生成的表单空间应该被存放到哪里
    // 第一个参数的二元数组中有四个元素，第一个是表单前面的显示文字，需要字符串形式
    // 第二个参数是表单的控件，或者是任何想要输出在第二个页面的HTML元素，以字符串形式给出，
    // 第三个和第四个参数表示元素的位置，由含有两个元素的数组表示，
    // 第三个参数是[起始X,起始Y]，第四个参数是[终止X,终止Y]
    let control1 = new Form2Init([
        ["<h2>登录</h2>",,[1,1],[2,1],false],
        ["用户名",'<input type="text" name="username" />',[1,2],[2,1],true],
        ["密   码",'<input type="password" name="password" />',[1,3],[2,1],true],
        ["职责选择",
            '<label>学生：<input type="radio" name="occupation" value="student" /></label>' +
            '<label>老师：<input type="radio" name="occupation" value="teacher" /></label>' +
            '<label>管理员：<input type="radio" name="occupation" value="manager" /></label>',
            [1,4],[2,1],true],
        ["验证码",`
                <div>
                    <input type="text" id="id-code" style="margin-right: 50px;vertical-align: center;" />
                    <div id="id-code-container" style="display: inline-block"></div>
                </div>
            `,[1,5],[2,1],true],
        ["<span id='login'>登  录</span>",,[1,6],[2,1],false],
        // ["<span id='forget-pwd'>找   回</span>",,[1,7],[2,1]],
    ],container);

    control1
        .importStyleSheet("./functions/gradient-form/form-style.css")
        .initControls(2,5,"./main.html","post",undefined,"main-form");

    control1.formElement.style.width = "100%";
    control1.formElement.style.gridRowGap = "2em";

    let formUI = new FormUI("main-form",container,true);
    formUI.run();

    formControl.push(control1);
});
export {formControl}