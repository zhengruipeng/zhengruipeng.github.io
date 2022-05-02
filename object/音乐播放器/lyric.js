let Lyric = function () {
    this.timeout = [];

    this.data = [
        "朴树 - 送别",
        "长亭外古道边芳草碧莲天",
        "晚风拂柳笛声残夕阳山外山",
        "天之涯地之角知交半零落",
        "一壶浊酒尽余欢今宵别梦寒",
        "情千缕酒一杯声声离笛催",
        "问君此去几时还来时莫徘徊",
        "天之涯地之角知交半零落",
        "一壶浊酒尽余欢今宵别梦寒",
        "天之涯地之角知交半零落",
        "问君此去几时还来时莫徘徊",
        "问君此去几时还来时莫徘徊"
    ];
    let lyric_div = document.getElementById("lyric");
    for(let i=0,len = this.data.length;i<len;i++){
        let div = document.createElement("div");
        switch(i){
            case 0:div.className = "bottomC";break;
            case 1:div.className = "bottom";break;
            default:div.className = "hiddenB";break;
        }
        div.innerHTML = this.data[i];
        lyric_div.appendChild(div)
    }
    this.timer = [0,19,29,41,51,63,74,84,94,129,139,150];
    for(let i = 0,len = this.data.length;i<len;i++){
        this.timeout[i] = setTimeout(function () {
            let will;
            for(let i=0,len = lyric_div.children.length;i<len;i++){
                switch(lyric_div.children[i].className){
                    case "top":
                        lyric_div.children[i].className = "hiddenT";
                        break;
                    case "topC":
                        lyric_div.children[i].className = "top";
                        break;
                    case "center":
                        lyric_div.children[i].className = "topC";
                        break;
                    case "bottomC":
                        lyric_div.children[i].className = "center";
                        break;
                    case "bottom":
                        lyric_div.children[i].className = "bottomC";
                        will = lyric_div.children[i+1];
                        break;
                }
            }
            will.className = "bottom";
        },this.timer[i]*1000)
    }
    this.pauseF = function () {
        for(let i=0,len = this.timeout.length;i<len;i++){
            clearTimeout(this.timeout[i]);
        }
    };
    this.playF = function () {


        let playing = audio.currentTime;
        let newArr = [];
        for(let i=0,len = this.timer.length;i<len;i++){
           if(this.timer[i+1]<playing) {continue} else newArr[i] = this.timer[i];
        }
        for(let i=0,len = newArr.length;i<len;i++){
            if(newArr[i-1] === undefined){
                continue;
            }

            this.timeout[i] = setTimeout(function () {
                let will;
                for(let j=0,leng = lyric_div.children.length;j<leng;j++){
                    switch(lyric_div.children[j].className){
                        case "top":
                            lyric_div.children[j].className = "hiddenT";
                            break;
                        case "topC":
                            lyric_div.children[j].className = "top";
                            break;
                        case "center":
                            lyric_div.children[j].className = "topC";
                            break;
                        case "bottomC":
                            lyric_div.children[j].className = "center";
                            break;
                        case "bottom":
                            lyric_div.children[j].className = "bottomC";
                            will = lyric_div.children[j+1];
                            break;
                    }
                }
                will.className = "bottom";
            },(newArr[i]-playing)*1000);


        }
    };
    this.jump = function (that) {
        this.pauseF();
        lyric_div.innerHTML = "";
        audio.currentTime = parseInt(that.style.left)/1100*172;
        let playing = audio.currentTime,grammar;

        for(let i=0,len = this.data.length;i<len;i++){
            if(this.timer[i]<playing && this.timer[i+1]>playing){
                grammar = i;
            }

        }
        console.log(grammar);
        let newArr = [];
        for(let i=0,len = this.timer.length;i<len;i++){
            if(this.timer[i+1]<playing) {continue} else newArr[i] = this.timer[i];
        }

        for(let i=0,len = newArr.length;i<len;i++){
            if(newArr[i-1] === undefined){
                continue;
            }

            this.timeout[i] = setTimeout(function () {

                let will;
                for(let j=0,leng = lyric_div.children.length;j<leng;j++){

                    switch(lyric_div.children[j].className){
                        case "top":
                            lyric_div.children[j].className = "hiddenT";
                            break;
                        case "topC":
                            lyric_div.children[j].className = "top";
                            break;
                        case "center":
                            lyric_div.children[j].className = "topC";
                            break;
                        case "bottomC":
                            lyric_div.children[j].className = "center";
                            break;
                        case "bottom":
                            lyric_div.children[j].className = "bottomC";
                            will = lyric_div.children[j+1];
                            break;
                    }
                }
                will.className = "bottom";
            },(newArr[i]-playing)*1000);


        }

    };
};

