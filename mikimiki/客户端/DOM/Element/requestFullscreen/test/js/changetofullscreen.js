(function  (){
    const canvas = document.getElementById("canvas");
    const changetofullscreen = document.getElementById("changetofullscreen");
    changetofullscreen.onclick = function (){
        canvas.requestFullscreen();
        canvas.requestPointerLock();
    }
})()