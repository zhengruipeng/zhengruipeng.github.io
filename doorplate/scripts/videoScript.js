(function (){
    if(globalVar.threeD.gl !== null)return false;
    let canvas = document.getElementById("webgl");
    let canvasClarity = document.getElementById("canvasClarity");
    document.body.removeChild(canvas);
    let video = document.createElement("video");
    video.src = "./video/1.mp4";
    video.muted = true;
    video.autoplay = true;
    video.style.position = "fixed";
    video.style.zIndex = "-1";
    video.style.top = "0";
    video.style.left = "0";
    video.style.height = "100%";
    video.style.width = "100%";
    video.loop = true;
    canvasClarity.disabled = true;

    document.body.appendChild(video);

})();