import {App} from "./App.js";

let slideEvent = function () {
    const slideBar = document.querySelector("#slide-bar");

    const slideBarShadowRoot = slideBar.shadowRoot;

    const navs = slideBarShadowRoot.querySelectorAll("nav");
    navs[0].addEventListener("click", function () {
        App.notice.showMessage("奉 天承运 皇帝诏曰：",
            "朕登基以来 福佑四海 席卷八荒 皇恩浩荡 天理昭昭",
            "成就太平盛世 万物兴旺 百姓太平",
            "正所谓普天之下莫非王土 率土之滨莫非王臣",
            "今理藩院呈上沙俄国生产橙猫一只",
            "以示与我天朝交好 此不乏为万国来朝之兆",
            "人话：就是一个撸猫游戏");
    });
    navs[1].addEventListener("click", function () {
        App.notice.showMessage("食用说明",
            "<img src='./images/emotion2.JPG' style='height:50px;width:50px' />等小图标表示猫咪现在的心情",
            "<img src='./images/emotion2.JPG' style='height:50px;width:50px' />是很开心的意思，可以试着摸两下",
            "<img src='./images/emotion3.JPG' style='height:50px;width:50px' />是很沮丧的意思，尽量别碰",
            "<img src='./images/emotion4.JPG' style='height:50px;width:50px' />是很想飞的意思，可以试着拽起来",
        );
    });
    navs[2].addEventListener("click", function () {
        App.notice.showMessage("感谢你游玩本游戏",
            "您现在的积分为：" + localStorage.getItem("score"),

        );
    });
}
export {slideEvent};