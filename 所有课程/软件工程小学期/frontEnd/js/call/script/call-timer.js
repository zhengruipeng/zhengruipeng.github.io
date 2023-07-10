import {AppGlobal} from "../module/AppGlobal.js";

/*
* 本模块用于设置修改通话时间，利用APPGlobal模块导出
* */

document.addEventListener("DOMContentLoaded", function () {
    const timerEle = this.querySelector("#videophone-container>#caller-timer");

    let modifyTime = function (min = 0, sec = 0) {
        let [minEle, secEle] = timerEle.children

        min = min + "";
        min.padStart(2, "0")

        sec = sec + "";
        sec.padStart(2, "0")

        minEle.innerHTML = min;
        secEle.innerHTML = sec;
    };

    let timer = 0;

    let interval = null;

    AppGlobal.callTimer.start = function () {
        if (interval) return;

        interval = setInterval(function () {
            timer++;
            modifyTime(Math.floor(timer / 60), timer % 60);

        }, 1000);
    };
    AppGlobal.callTimer.stop = function () {
        clearInterval(interval);
        interval = null;
    };
    AppGlobal.callTimer.reset = function () {
        timer = 0;
        modifyTime(0, 0)
    }
})