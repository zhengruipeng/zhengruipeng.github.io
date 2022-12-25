document.addEventListener("DOMContentLoaded",function (){
    const asideControllerBtn = this.querySelector('#aside-controller');
    const container = this.querySelector('#container');

    let opened = true;
    asideControllerBtn.addEventListener("click",function (){
        if(opened){
            container.style.maxWidth = "133.3vw";
            container.style.width = "133.3vw";
            container.style.transform = "translate(-33.3vw)";
            asideControllerBtn.style.left = "0";
            asideControllerBtn.style.transform = "matrix(-1,0,0,1,0,0)";
            opened = false;
        }else{
            container.style.maxWidth = "100vw";
            container.style.width = "100vw";
            container.style.transform = "";
            asideControllerBtn.style.left = "25%";
            asideControllerBtn.style.transform = "matrix(1,0,0,1,0,0)";
            opened = true;

        }
    });
})