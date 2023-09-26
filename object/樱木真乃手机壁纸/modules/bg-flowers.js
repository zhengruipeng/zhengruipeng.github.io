document.addEventListener("DOMContentLoaded", function () {
    const flowersContainer = this.createElement("div");
    flowersContainer.style.position = "fixed";
    flowersContainer.style.top = "0";
    flowersContainer.style.left = "0";
    flowersContainer.style.height = "100%";
    flowersContainer.style.width = "100%";
    flowersContainer.style.zIndex = "1";
    document.body.appendChild(flowersContainer);

    let globalTimer = 0;

    let startPageFlowerPartical = class {
        omiga = 0;
        v = 0;
        theta = 0;
        beginPoint = 0;
        backgroundImage = "";
        axis = [];

        initOmiga(min, max) {
            this.omiga = Math.random() * (max - min) + min;
        };

        initV(min, max) {
            this.v = Math.random() * (max - min) + min;
        }

        initBeginPoint() {
            this.beginPoint = Math.random() * (document.documentElement.clientWidth);
        }

        initBackgroundImage() {
            this.backgroundImage = "./images/flowers/flower" + Math.ceil(Math.random() * 5) + ".png";
        }

        initTheta() {
            let degree = Math.floor(Math.random() * 90) - 45;
            this.theta = Math.PI / 180 * degree;
        }

        constructor() {
            this.initOmiga(1, 3);
            this.initV(1, 2);
            this.initBeginPoint();
            this.initBackgroundImage();
            this.initTheta();
            this.axis = [Math.random() * 2, Math.random() * 2, Math.random() * 2];
        }
    }
    let startPageFlowerAnime = class extends startPageFlowerPartical {
        t = 0;
        flowerContainer = null;
        maxHeight = document.documentElement.clientHeight;
        maxWidth = document.documentElement.clientWidth;
        interval = null;
        status = "ready";
        deltaTime = 0;

        checkOutofScreen() {
            if (Number.parseInt(this.flowerContainer.style.top) > this.maxHeight) {
                try {
                    this.destroy()
                } catch (e) {

                }
                return true;
            }
        };

        checkAtCenter() {
            if ((Number.parseInt(this.flowerContainer.style.top) > this.maxHeight / 4) &&
                (Number.parseInt(this.flowerContainer.style.left) > this.maxWidth / 3) &&
                (Number.parseInt(this.flowerContainer.style.left) < this.maxWidth * 2 / 3)
            ) {
                this.fadeOut();

            }
        }

        play() {
            if (this.checkOutofScreen() & this.checkAtCenter()) {
                return true;
            }
            //this.flowerContainer.style.border = "red solid 1px";
            this.status = "running";

            this.flowerContainer.style.left = this.beginPoint - this.t * this.v * Math.sin(this.theta) + "px";
            this.flowerContainer.style.top = (this.t * this.v * Math.cos(this.theta)) - 70 + "px";
            this.flowerContainer.style.transform = `rotate3d(${this.axis[0]},${this.axis[1]},${this.axis[2]},${this.omiga * this.t}deg)`;
            let that = this;
            this.interval = window.requestAnimationFrame(function (time) {
                that.t += 1 * (globalTimer / (1000 / 60));
                that.play.call(that, []);
            });
        }

        destroy() {
            try {
                window.cancelAnimationFrame(this.interval);
                // flowersContainer.removeChild(this.flowerContainer);
                this.status = "finished";
                // flowers = flowers.splice(flowers.indexOf(this), 1);
            } catch (e) {
            }
        }

        reset() {
            this.t = 0;
            this.flowerContainer.style.opacity = "1";
        }

        fadeOut() {
            this.flowerContainer.style.opacity = parseFloat(this.flowerContainer.style.opacity) - 0.05;
            if (parseFloat(this.flowerContainer.style.opacity) <= 0) {
                this.destroy();
                return true;
            }
        }

        constructor() {
            super();
            this.flowerContainer = document.createElement("div");
            this.flowerContainer.style.width = 30 - 15 * Math.sin(this.beginPoint * Math.PI / this.maxWidth) + "px";
            this.flowerContainer.style.height = 30 - 15 * Math.sin(this.beginPoint * Math.PI / this.maxWidth) + "px";
            this.flowerContainer.style.opacity = "1";
            this.flowerContainer.style.backgroundImage = `url("${this.backgroundImage}")`;
            this.flowerContainer.style.backgroundRepeat = `no-repeat`;
            this.flowerContainer.style.backgroundSize = "100% 100%";
            this.flowerContainer.style.position = "fixed";
            this.flowerContainer.style.top = "-100px";
            flowersContainer.appendChild(this.flowerContainer);
        }
    };
    let limitFlowersNumber = function (n) {
        /*if (flowers.length > n) {
            for (let i = n; i < flowers.length; i++) {
                flowers[i].destroy();
            }
        }*/
        for (let i = 0; i < n; i++) {
            flowers.push(new startPageFlowerAnime());
        }
    };

    let flowers = [];

    let flowersPointer = {
        pointer: 0,
        get next() {
            this.pointer++;
            if (this.pointer >= flowers.length) {
                return 0;
            }
            return this.pointer;
        }
    }
    limitFlowersNumber(100);

    let createRandomAnime = function () {
        // let flower1 = new startPageFlowerAnime();
        // flower1.play();
        // let flower2 = new startPageFlowerAnime();
        // flower2.play();
        // flowers.push(flower1, flower2);
        flowers[flowersPointer.pointer].reset();
        flowers[flowersPointer.pointer].play();
        let currPointer = flowersPointer.pointer;
        for (let i = 0; i < flowers.length / 7; i++) {
            flowersPointer.pointer = flowersPointer.next;
            flowers[flowersPointer.pointer].fadeOut();
        }
        flowersPointer.pointer = currPointer;
        flowersPointer.pointer = flowersPointer.next;

        let nextStage = Math.floor(Math.random() * 500);
        setTimeout(createRandomAnime, nextStage);
    };

    let oldTime = 0;
    let globalTiming = function (time) {
        globalTimer = oldTime;
        globalTimer = time - globalTimer;
        oldTime = time;
        requestAnimationFrame(globalTiming);
    };
    globalTiming(0);

    createRandomAnime();
});
