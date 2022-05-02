let changeColor = function (){
    var canvas = document.createElement("canvas");
    canvas.height = "400";
    canvas.width = "400";
    canvas.style.display = "none";
    let c = canvas.getContext("2d");
    c.drawImage(image,0,0);
    let data = c.getImageData(0,0,400,400);
    let rand = Math.ceil(Math.random()*(400*400/4))*4;
    let info = [Math.pow(data.data[rand],2),Math.pow(data.data[rand+1],2),Math.pow(data.data[rand+2],2)];
    pause.style.backgroundColor = "rgb("+info[0]+","+info[1]+","+info[2]+")";
    document.getElementById("process").style.backgroundColor = "rgb("+info[0]+","+info[1]+","+info[2]+")";
};
let picture = function (){
    image.style.opacity = "0";
    setTimeout(function (){
        let arr = image.src.substr(-5,1);
        let res = parseInt(arr)+1;
        res>4?res = 1:res;
        image.src = "./image/"+res+".jpg";
        changeColor();
        image.style.opacity = "1";
    },500);
};