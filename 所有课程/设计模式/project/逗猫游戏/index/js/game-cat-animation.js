let GameCatAnimation = class extends Object {
    gameCat = null;
    catContainer = null;
    cat = null;
    animationManager = {};

    #transforms = [];

    constructor(/*GameCat*/ gameCat) {
        super();
        this.gameCat = gameCat;
        this.catContainer = this.gameCat.catContainer;
        this.cat = this.catContainer.querySelector("#game-cat-main");
    }

    shake() {
        /*animation-name: shake;*/
        /*animation-duration: .7s;*/
        /*animation-iteration-count: infinite;*/
        /*animation-direction: alternate-reverse;*/
        /*animation-timing-function: steps(2, jump-both);*/
        let animationEffect = new KeyframeEffect(
            this.cat ?? this.catContainer.querySelector("#game-cat-main"),
            [
                {transform: 'rotate(-15deg)'},
                {transform: 'rotate(15deg)'},
            ], {
                duration: 700,
                iterations: Infinity,
                direction: "alternate",
                easing: "steps(2, jump-both)",
                composite: "add",

            });

        let documentTimeline = new DocumentTimeline({originTime: 0});

        let anime = new Animation(animationEffect, documentTimeline);

        this.animationManager.shake = anime;

        anime.play();
    }

    turnBack() {
        /*animation-name: turnBack;*/
        /*animation-duration: 0.25s;*/
        /*animation-iteration-count: 2;*/
        /*animation-direction: alternate;*/
        /*animation-timing-function: linear;*/
        let animationEffect = new KeyframeEffect(
            this.cat ?? this.catContainer.querySelector("#game-cat-main"),
            [
                {transform: 'rotateY(180deg)', transformOrigin: "center center"},
                {transform: 'rotateY(180deg)', transformOrigin: "center center"},
            ], {
                duration: 250,
                iterations: 1,
                direction: "alternate",
                easing: "linear",
                fill:"forwards",
                delay: 2500,
                composite:"add",
            });

        let documentTimeline = new DocumentTimeline({originTime: 0});

        let anime = new Animation(animationEffect, documentTimeline);
        this.animationManager.turnBack = anime;

        anime.play();
    }

    walk() {
        /*animation-name: walk;*/
        /*animation-duration: 2.5s;*/
        /*animation-iteration-count: infinite;*/
        /*animation-direction: alternate;*/
        /*animation-timing-function: linear;*/
        let animationEffect = new KeyframeEffect(
            this.cat ?? this.catContainer.querySelector("#game-cat-main"),
            [
                {transform: 'translateX(0)'},
                {transform: 'translateX(20vw)'},
            ], {
                duration: 2500,
                iterations: Infinity,
                direction: "normal",
                easing: "linear",
                composite: "add",
            });

        let documentTimeline = new DocumentTimeline({originTime: 0});

        let anime = new Animation(animationEffect, documentTimeline);
        this.animationManager.walk = anime;

        anime.play();
    }

    bouncy() {
        /*animation-name: bouncy;*/
        /*animation-duration: 0.3s;*/
        /*animation-iteration-count: 1;*/
        /*animation-direction: alternate;*/
        /*animation-timing-function: linear;*/
        /*
        *
        from {
            --transform4: scale(0.9, 1.2) translateY(-20px);
        }
        40% {
            --transform4: scale(1.2, 0.8) translateY(20px);
        }
        70% {
            --transform4: scale(1, 1.1) translateY(-10px);
        }
        90% {
            --transform4: scale(1.1, 0.9) translateY(10px);
        }
        to {
            --transform4: scale(1, 1) translateY(0);
        }*/

        let animationEffect = new KeyframeEffect(
            this.cat ?? this.catContainer.querySelector("#game-cat-main"),
            [
                {transform: 'scale(0.9, 1.2) translateY(-20px)', offset: 0},
                {transform: 'scale(1.2, 0.8) translateY(20px)', offset: .4},
                {transform: 'scale(1, 1.1) translateY(-10px)', offset: .7},
                {transform: 'scale(1.1, 0.9) translateY(10px)', offset: .9},
                {transform: 'scale(1, 1) translateY(0)', offset: 1},
            ], {
                duration: 300,
                iterations: 1,
                direction: "alternate",
                easing: "linear",
                composite: "add",
            });

        let documentTimeline = new DocumentTimeline({originTime: 0});

        let anime = new Animation(animationEffect, documentTimeline);
        this.animationManager.bouncy = anime;

        anime.play();
    }


    /*
    * 终止所有动画并从管理器中删除
    * */
    clearAll() {
        for (let animeName in this.animationManager) {
            let anime = this.animationManager[animeName];
            anime.cancel();

            delete this.animationManager[animeName];
        }
    }

    /*
    * @keyframes shake {
        from {
            --transform1: rotate(-15deg);
        }
        to {
            --transform1: rotate(15deg);
        }
    }

    猫咪来回走动时转身的动画
        @keyframes turnBack {
        from {
            --transform2: matrix(1, 0, 0, 1, 0, 0);
            }
            to {
                --transform2: matrix(-1, 0, 0, 1, 0, 0);
            }
        }

    走路动画
    @keyframes walk {
        from {
            --transform3: translateX(0px);
            box-shadow: 0 0 0 #5F0000;
        }
        to {
            --transform3: translateX(20vw);
            box-shadow: 0 0 20px #5F0000;

        }
    }

    被拎起来时的弹性球动画
    @keyframes bouncy {
        from {
            --transform4: scale(0.9, 1.2) translateY(-20px);
        }
        40% {
            --transform4: scale(1.2, 0.8) translateY(20px);
        }
        70% {
            --transform4: scale(1, 1.1) translateY(-10px);
        }
        90% {
            --transform4: scale(1.1, 0.9) translateY(10px);
        }
        to {
            --transform4: scale(1, 1) translateY(0);
        }
    }*/
};

export {GameCatAnimation}