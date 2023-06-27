document.addEventListener("DOMContentLoaded",function (){
    const flowersContainer = this.createElement("div");
    flowersContainer.style.position = "fixed";
    flowersContainer.style.top = "0";
    flowersContainer.style.left = "0";
    flowersContainer.style.height = "100%";
    flowersContainer.style.width = "100%";
    flowersContainer.style.zIndex = "-1";
    document.body.appendChild(flowersContainer);

    let globalTimer = 0;

    let startPageFlowerPartical = class {
        omiga = 0;
        v = 0;
        theta = 0;
        beginPoint = 0;
        backgroundImage = "";
        axis = [];
        initOmiga(min,max){
            this.omiga = Math.floor(Math.random()*min+(max-min));
        };
        initV(min,max){
            this.v = Math.floor(Math.random()*min+(max-min));
        }
        initBeginPoint(){
            this.beginPoint = Math.floor(Math.random()*(document.documentElement.clientWidth));
        }
        initBackgroundImage(){
            this.backgroundImage = "./images/flowers/flower"+Math.ceil(Math.random()*5)+".png";
        }
        initTheta(){
            let degree = Math.floor(Math.random()*90)-45;
            this.theta = Math.PI / 180 * degree;
        }
        constructor() {
            this.initOmiga(3,7);
            this.initV(3,8);
            this.initBeginPoint();
            this.initBeginPoint();
            this.initBackgroundImage();
            this.initTheta();
            this.axis = [Math.random()*2,Math.random()*2,Math.random()*2];
        }
    }
    let startPageFlowerAnime = class extends startPageFlowerPartical{
        t = 0;
        flowerContainer = null;
        maxHeight = document.documentElement.clientHeight;
        interval = null;
        status = "ready";
        deltaTime = 0;
        checkOutofScreen(){
            if(Number.parseInt(this.flowerContainer.style.top) > this.maxHeight){
                try{
                    window.cancelAnimationFrame(this.interval);
                    flowersContainer.removeChild(this.flowerContainer);
                    this.status = "finished";
                }catch (e){

                }
                return true;
            }
        }
        play(){
            if(this.checkOutofScreen()){
                return true;
            }
            //this.flowerContainer.style.border = "red solid 1px";
            this.status = "running";
            this.flowerContainer.style.backgroundImage = `url("${this.backgroundImage}")`;
            this.flowerContainer.style.backgroundRepeat = `no-repeat`;
            this.flowerContainer.style.backgroundSize = "100% 100%";
            this.flowerContainer.style.position = "fixed";
            this.flowerContainer.style.left = this.beginPoint - this.t * this.v * Math.sin(this.theta)+"px";
            this.flowerContainer.style.top = (this.t * this.v * Math.cos(this.theta))-70+"px";
            this.flowerContainer.style.transform = `rotate3d(${this.axis[0]},${this.axis[1]},${this.axis[2]},${this.omiga*this.t}deg)`;
            this.flowerContainer.style.height = "40px";
            this.flowerContainer.style.width = "40px";
            let that = this;
            this.interval = window.requestAnimationFrame(function (time){
                that.t += 1 * (globalTimer/(1000/60));
                that.play.call(that,[]);
            });
        }
        constructor(){
            super();
            this.flowerContainer = document.createElement("div");
            flowersContainer.appendChild(this.flowerContainer);
        }
    };
    let limitFlowersNumber = function (n){
        if(flowersContainer.children.length>n){
            for(let i = n;i<flowersContainer.children.length;i++){
                flowersContainer.children[i].parentElement.removeChild(flowersContainer.children[i]);
            }
        }
    }
    let createRandomAnime = function (){
        limitFlowersNumber(20);
        let flower1 = new startPageFlowerAnime();
        flower1.play();
        let flower2 = new startPageFlowerAnime();
        flower2.play();
        let nextStage = Math.floor(Math.random()*700);
        setTimeout(createRandomAnime,nextStage);
    };

    let oldTime = 0;
    let globalTiming = function (time){
        globalTimer = oldTime;
        globalTimer = time - globalTimer;
        oldTime = time;
        requestAnimationFrame(globalTiming);
    };
    globalTiming(0);

    createRandomAnime();
});
