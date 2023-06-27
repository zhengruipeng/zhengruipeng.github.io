import {CAT_STATUS_CAN_GENERATED, CAT_STATUS} from "./game-cat-status.js";
import {GameCatAnimation} from "./game-cat-animation.js";
import {GameCatAction} from "./game-cat-action.js";
import {GameCatEmotion} from "./game-cat-emotion.js";
import {ConstantObserver} from "../../common-plugins/ConstantObserver.js";
import {GAME_CAT_EMOTION_STATUS} from "./game-cat-emotion-status.js";

let GameCat = class extends Object {
    //猫图片的容器
    catContainer = document.body;
    //猫图片元素
    cat = null;
    catEmotion = null;
    //猫图片的高度
    catHeight;
    //猫图片的宽度
    catWidth;
    //猫的状态，监听者是
    status = new ConstantObserver(CAT_STATUS.SIT);
    //猫的心情，目前没有事件监听
    emotion = new ConstantObserver(GAME_CAT_EMOTION_STATUS.NO_EMOTION);
    //与此对象关联的动画对象
    gameCatAnimation = new GameCatAnimation(this);
    //与此对象关联的猫的动作对象
    gameCatAction = new GameCatAction(this);
    //与此对象关联的猫的心情对象
    gameCatEmotion = new GameCatEmotion(this);
    //状态和图片路径的映射
    statusPicture = {
        [CAT_STATUS.FLY]: "./images/action1.png",
        [CAT_STATUS.WALK]: "./images/action2.png",
        [CAT_STATUS.SIT]: "./images/action3.png",
        [CAT_STATUS.TOUCH]: "./images/action3.png",
    };
    emotionPicture = {
        [GAME_CAT_EMOTION_STATUS.LOVE]: "./images/emotion2.JPG",
        [GAME_CAT_EMOTION_STATUS.BORING]: "./images/emotion3.JPG",
        [GAME_CAT_EMOTION_STATUS.WANTFLY]: "./images/emotion4.JPG",
        [GAME_CAT_EMOTION_STATUS.NO_EMOTION]: "./images/emotion1.JPG",
    };
    constructor() {
        super();
    }
    //初始化工作
    init(container) {
        this.catContainer = container;

        this.catContainer.innerHTML =
            `
                <img src="${this.statusPicture[this.status.value]}" id="game-cat-main" />  
                <img src="${this.emotionPicture[this.emotion.value]}" id="game-cat-emotion" />
            `;

        this.cat = this.catContainer.querySelector("#game-cat-main");
        this.catEmotion = this.catContainer.querySelector("#game-cat-emotion");

        let docHeight = document.documentElement.clientHeight;
        let docWidth = document.documentElement.clientWidth;

        //设置猫的大小
        this.catWidth = docWidth * 3 / 10;
        this.catHeight = docWidth * 3 / 10;
        //设置CSS初始值
        this.catContainer.style.setProperty("--cat-top", "30%");
        this.catContainer.style.setProperty("--cat-left", "30%");
        this.cat.style.setProperty("--cat-width", this.catWidth + "px");
        this.cat.style.setProperty("--cat-height", this.catHeight + "px");
        this.catEmotion.style.setProperty("--dialog-left", this.catHeight + "px");
        this.catEmotion.style.setProperty("--dialog-top", this.catHeight + "px");

        // console.log(this);
        this.gameCatAction.statusGenerator(5000, 5000);
        this.gameCatEmotion.statusGenerator(7000, 10000);

        this.initEvent();
    }
    //初始化互交事件
    initEvent() {
        let that = this;
        let dragTimer;

        let mousemoveCB1 = function (ev) {
            let docHeight = document.documentElement.clientHeight;
            let docWidth = document.documentElement.clientWidth;

            //将xy坐标压缩在屏幕离边框50像素内
            that.cat.style.setProperty("--cat-top",
                Math.max(50, Math.min(docHeight - that.catHeight - 100, ev.y - that.catHeight / 2)) + "px");

            that.cat.style.setProperty("--cat-left",
                Math.max(50, Math.min(docWidth - that.catWidth - 100, ev.x - that.catWidth / 2)) + "px");

        }
        let mousedownCB1 = function () {
            clearTimeout(that.gameCatAction.statusGenerator.timer);
            dragTimer = setTimeout(function () {
                that.gameCatAction.changeStatus(CAT_STATUS.FLY);

                document.addEventListener("mousemove", mousemoveCB1);
                document.addEventListener("mouseup", mouseupCB1);
            }, 300);
        };
        let mouseupCB1 = function () {
            // console.log("执行了mouseup");
            //如果用户点击没到300毫秒当成是点击事件，clearTimeout会在延迟执行之前触发
            //如果用户长按300毫秒以上此操作没意义
            clearTimeout(dragTimer);

            //当用户放下猫的时候播放一个TOUCH的动画
            that.gameCatAction.changeStatus(CAT_STATUS.TOUCH);

            //在停止互交的一段时间后自动改变状态
            //先停止当前动画防止一次性出现多个动画
            clearTimeout(that.gameCatAction.statusGenerator.timer);
            that.gameCatAction.statusGenerator.timer = setTimeout(function () {
                that.gameCatAction.statusGenerator(5000, 5000);
            }, 3000);

            that.cat.style.setProperty("--cat-top", "33%");
            //删除mouseup事件防止同时注册多个事件
            document.removeEventListener("mousemove", mousemoveCB1);
            document.removeEventListener("mouseup", mouseupCB1);

        };
        let clickCB1 = function () {
            // console.log("执行了click")
            clearTimeout(dragTimer);

            that.gameCatAction.changeStatus(CAT_STATUS.TOUCH);

            //在停止互交的一段时间后自动改变状态
            //先停止当前动画防止一次性出现多个动画
            clearTimeout(that.gameCatAction.statusGenerator.timer);
            that.gameCatAction.statusGenerator.timer = setTimeout(function () {
                that.gameCatAction.statusGenerator(5000, 5000);
            }, 3000);
        };

        let dragstartCB1 = function (ev) {
            ev.preventDefault();
        };

        this.cat.addEventListener("mousedown", mousedownCB1);
        this.cat.addEventListener("click", clickCB1);
        this.cat.addEventListener("dragstart", dragstartCB1);
    }

};

export {GameCat}