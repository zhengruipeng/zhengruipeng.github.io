document.addEventListener("DOMContentLoaded", function () {
    const videophoneContainer = this.getElementById("videophone-container");
    const receiveBtn = this.getElementById("receive");
    const finishBtn = this.getElementById("finish");

    /*
    *  --hungup-point-x:0px;
    *  --hungup-point-y:0px;
    * */
    let [x,y] = (_ => {
        let y = receiveBtn.getBoundingClientRect().top;
        let left = finishBtn.getBoundingClientRect().left;
        let width = receiveBtn.getBoundingClientRect().width;
        let containerWidth = videophoneContainer.getBoundingClientRect().width;
        let x = containerWidth/2 - width/2 - left;
        return [x,y];
    })();


    videophoneContainer.style.setProperty("--hungup-point-x",x+"px");
    videophoneContainer.style.setProperty("--hungup-point-y",y+"px");

    receiveBtn.addEventListener("click", function () {
        receiveBtn.className = "calling";
        finishBtn.className = "calling";
    });
    finishBtn.addEventListener("click", function () {
        videophoneContainer.className = "end"

    });
})