import {Notice} from "../../common-plugins/notice/Notice.js";
import {Network} from "../../common-plugins/Network.js";

//适配器模式
let App = {

    debug: (function () {
        // localStorage.setItem("score", 0);
        return false;
    })(),
    //初始化Notice类做通知栏
    notice: (function () {
        let notice = new Notice("../common-plugins/notice/notice-style.css");
        notice.init();
        return notice;
    })(),
    //发送测试请求查看是否在线
    offline: (async function () {
        let res = await Network.isOffline();
        if (res) {
            App.notice.showMessage("目前属于离线状态，游戏数据会保存至本地");
        }
        return res;
    })()
};

export {App}