import {CAT_STATUS_CAN_GENERATED, CAT_STATUS} from "./game-cat-status.js";

let GameCatAction = class extends Object {
    gameCat;


    sitHandle() {
        this.gameCat.gameCatAnimation.clearAll();

        this.gameCat.gameCatAnimation.shake();

        this.gameCat.status.value = CAT_STATUS.SIT;
        this.gameCat.cat.src = this.gameCat.statusPicture[CAT_STATUS.SIT];
    }

    walkHandle() {
        this.gameCat.gameCatAnimation.clearAll();

        this.gameCat.gameCatAnimation.shake();
        this.gameCat.gameCatAnimation.turnBack();
        this.gameCat.gameCatAnimation.walk();

        this.gameCat.status.value = CAT_STATUS.WALK;
        this.gameCat.cat.src = this.gameCat.statusPicture[CAT_STATUS.WALK];

    }

    flyHandle() {
        this.gameCat.gameCatAnimation.clearAll();

        this.gameCat.gameCatAnimation.bouncy()

        this.gameCat.status.value = CAT_STATUS.FLY;
        this.gameCat.cat.src = this.gameCat.statusPicture[CAT_STATUS.FLY];

    }

    touchHandle() {
        this.gameCat.gameCatAnimation.clearAll();

        this.gameCat.gameCatAnimation.bouncy()

        this.gameCat.status.value = CAT_STATUS.TOUCH;
        this.gameCat.cat.src = this.gameCat.statusPicture[CAT_STATUS.TOUCH];

    }

    /*
    * @description: 核心改变状态的函数，用于把抽象状态和底层图片动画显示连通*/
    changeStatus(status) {
        switch (status) {
            case CAT_STATUS.SIT:
                this.sitHandle();
                break;
            case CAT_STATUS.WALK:
                this.walkHandle();
                break;
            case CAT_STATUS.FLY:
                this.flyHandle();
                break;
            case CAT_STATUS.TOUCH:
                this.touchHandle();
                break;
            default:
                break;
        }
    }

    /*
    * @param:
    *   minTime: 下一次心情变化的最小时间
    *   maxTime: 下一次心情变化的最大时间
    * @property:
    *   timer: 记录当前的计时器
    * */
    statusGenerator(/*int*/ minTime,/*int*/ maxTime) {
        //下一次状态变化的时间
        let changeTime = Math.random();
        changeTime = minTime + changeTime * (maxTime - minTime);

        //随机生成一个下一个状态
        let statusCode = Math.random();
        statusCode = Math.floor(statusCode *
            (Object.keys(CAT_STATUS_CAN_GENERATED).length));

        console.log(
            CAT_STATUS_CAN_GENERATED[
                Object.keys(CAT_STATUS_CAN_GENERATED)[statusCode]
                ])

        //根据随机生成的状态码获取状态并传递给下一层函数
        this.changeStatus(
            CAT_STATUS_CAN_GENERATED[
                Object.keys(CAT_STATUS_CAN_GENERATED)[statusCode]
                ]
        );

        this.statusGenerator.timer = setTimeout(function (that) {
            that.statusGenerator(minTime, maxTime);
        }, changeTime, this);

    }

    constructor(gameCat) {
        super();
        this.gameCat = gameCat;

    }
}
export {GameCatAction}