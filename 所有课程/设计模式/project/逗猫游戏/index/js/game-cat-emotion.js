import {CAT_STATUS, CAT_STATUS_CAN_GENERATED} from "./game-cat-status.js";
import {GAME_CAT_EMOTION_STATUS} from "./game-cat-emotion-status.js";
import {ConstantObserver, ObserverCallBackType} from "../../common-plugins/ConstantObserver.js";
import {GameCatScore} from "./game-cat-score.js";
import {App} from "./App.js";
import {Config} from "../../common-plugins/config.js";

let GameCatEmotion = class extends Object {
    gameCat;

    /*
    * 记录最近的监听函数，用于删除
    */

    listeningCB;

    /*
    * */
    loveHandle() {
        //如果有其他监听事件则全部清除，只留当前的
        if (this.listeningCB) {
            this.gameCat.status.removeEventListener(ObserverCallBackType.change, this.listeningCB)
        }

        this.gameCat.catEmotion.src = this.gameCat.emotionPicture[GAME_CAT_EMOTION_STATUS.LOVE];
        this.gameCat.catEmotion.classList.add("open");

        let cb = function () {
            if (this.value !== CAT_STATUS.TOUCH) return false;

            /*此处流程：
            *   1：将分数储存至本地数据库中，同时显示到页面上
            *   2：判断用户是否为离线使用，如果不是，跳到第三部，如果是则结束
            *   3：发送网络请求至后端
            *
            * */
            GameCatScore.add();
            localStorage.setItem("score", GameCatScore.score);
            const gameScore = document.querySelector("#game-score");
            gameScore.innerHTML = localStorage.getItem("score") ?? 0;

            if (App.offline) {
                // App.notice.showMessage("目前属于离线状态，游戏数据会保存至本地");

                return false;
            }

            fetch(Config.service.UPDATE_SCORE.path)
                .then(response => response.json())
                // .then(text => JSON.parse(text))
                .then(json => {
                    //如果保存失败
                    if (!json.res) {
                        App.notice.show("保存至后台失败，请联系工作人员");
                    }
                })
        }
        this.gameCat.status.addEventListener(ObserverCallBackType.change, cb)
        this.listeningCB = cb;
    }

    boringHandle() {
        //如果有其他监听事件则全部清除，只留当前的
        if (this.listeningCB) {
            this.gameCat.status.removeEventListener(ObserverCallBackType.change, this.listeningCB)
        }

        this.gameCat.catEmotion.src = this.gameCat.emotionPicture[GAME_CAT_EMOTION_STATUS.BORING];
        this.gameCat.catEmotion.classList.add("open");
        let cb = function () {
            if (this.value !== CAT_STATUS.TOUCH) return false;

            /*此处流程：
            *   1：将分数储存至本地数据库中，同时显示到页面上
            *   2：判断用户是否为离线使用，如果不是，跳到第三部，如果是则结束
            *   3：发送网络请求至后端
            *
            * */
            GameCatScore.minus();
            localStorage.setItem("score", GameCatScore.score);
            const gameScore = document.querySelector("#game-score");
            gameScore.innerHTML = localStorage.getItem("score") ?? 0;

            if (App.offline) {
                // App.notice.show("目前属于离线状态，游戏数据会保存至本地");

                return false;
            }

            fetch(Config.service.UPDATE_SCORE.path)
                .then(response => response.text())
                .then(text => JSON.parse(text))
                .then(json => {
                    //如果保存失败
                    if (!json.res) {
                        App.notice.show("保存至后台失败，请联系工作人员");
                    }
                })
        }
        this.gameCat.status.addEventListener(ObserverCallBackType.change, cb)
        this.listeningCB = cb;
    }

    wantFlyHandle() {
        //如果有其他监听事件则全部清除，只留当前的
        if (this.listeningCB) {
            this.gameCat.status.removeEventListener(ObserverCallBackType.change, this.listeningCB)
        }

        this.gameCat.catEmotion.src = this.gameCat.emotionPicture[GAME_CAT_EMOTION_STATUS.WANTFLY];
        this.gameCat.catEmotion.classList.add("open");
        let cb = function () {
            if (this.value !== CAT_STATUS.FLY) return false;

            /*此处流程：
            *   1：将分数储存至本地数据库中，同时显示到页面上
            *   2：判断用户是否为离线使用，如果不是，跳到第三部，如果是则结束
            *   3：发送网络请求至后端
            *
            * */
            GameCatScore.add();
            localStorage.setItem("score", GameCatScore.score);
            const gameScore = document.querySelector("#game-score");
            gameScore.innerHTML = localStorage.getItem("score") ?? 0;

            if (App.offline) {
                // App.notice.show("目前属于离线状态，游戏数据会保存至本地");

                return false;
            }

            fetch(Config.service.UPDATE_SCORE.path)
                .then(response => response.text())
                .then(text => JSON.parse(text))
                .then(json => {
                    //如果保存失败
                    if (!json.res) {
                        App.notice.show("保存至后台失败，请联系工作人员");
                    }
                })
        }
        this.gameCat.status.addEventListener(ObserverCallBackType.change, cb)
        this.listeningCB = cb;
    }
    noEmotionHandle() {
        //如果有其他监听事件则全部清除，只留当前的
        if (this.listeningCB) {
            this.gameCat.status.removeEventListener(ObserverCallBackType.change, this.listeningCB)
        }

        this.gameCat.catEmotion.src = this.gameCat.emotionPicture[GAME_CAT_EMOTION_STATUS.NO_EMOTION];
        this.gameCat.catEmotion.classList.remove("open");

        this.listeningCB = null;
    }

    changeEmotion(emotion) {
        switch (emotion) {
            case GAME_CAT_EMOTION_STATUS.LOVE:
                this.loveHandle();
                break;
            case GAME_CAT_EMOTION_STATUS.BORING:
                this.boringHandle();
                break;
            case GAME_CAT_EMOTION_STATUS.WANTFLY:
                this.wantFlyHandle();
                break;
            case GAME_CAT_EMOTION_STATUS.NO_EMOTION:
                this.noEmotionHandle();
                break;
            default:
                break;
        }
    }


    statusGenerator(/*int*/ minTime,/*int*/ maxTime) {
        //下一次心情变化的时间
        let changeTime = Math.random();
        changeTime = minTime + changeTime * (maxTime - minTime);

        let emotion;
        //如果之前有心情的话就改为没有，否则就选一个心情
        if (this.gameCat.emotion.value !== GAME_CAT_EMOTION_STATUS.NO_EMOTION) {
            emotion = GAME_CAT_EMOTION_STATUS.NO_EMOTION
        } else {
            //随机生成一个下一个心情
            //出去NO_EMOTION
            let statusCode = Math.random();
            statusCode = Math.floor(statusCode *
                (Object.keys(GAME_CAT_EMOTION_STATUS).length));

            emotion =
                GAME_CAT_EMOTION_STATUS[
                    Object.keys(GAME_CAT_EMOTION_STATUS)[statusCode]
                    ];
            // emotion = GAME_CAT_EMOTION_STATUS.WANTFLY;
        }
        console.log(emotion)
        emotion = GAME_CAT_EMOTION_STATUS.BORING;
        this.gameCat.emotion.value = emotion;
        //根据随机生成的状态码获取状态并传递给下一层函数
        this.changeEmotion(emotion);

        this.statusGenerator.timer = setTimeout(function (that) {
            that.statusGenerator(minTime, maxTime);
        }, changeTime, this);

    }

    constructor(gameCat) {
        super();
        this.gameCat = gameCat;

    }
}
export {GameCatEmotion}