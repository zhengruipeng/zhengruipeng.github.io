//此脚本用于算出摁键居中的位置
document.addEventListener("DOMContentLoaded", function () {
    const videophoneContainer = this.getElementById("videophone-container");
    const receiveBtn = this.getElementById("receive");
    const finishBtn = this.getElementById("finish");
    const hiddenBtn = this.getElementById("hidden");

    /*
    *  --hungup-point-x:0px;
    *  --hungup-point-y:0px;
    * */
    //设置以上两个变量的值
    //摁键位置通过绝对定位进行定位
    //所以需要计算绝对坐标
    let modifyCenterPoint = function () {
        let [x, y] = (_ => {
            //计算高度，可以用隐藏的帮助计算的摁键的位置进行计算
            let y = hiddenBtn.getBoundingClientRect().top;
            //计算摁键中心的坐标
            let x =
                document.documentElement.clientWidth / 2 -
                hiddenBtn.getBoundingClientRect().width / 2;
            return [x, y];
        })();

        //根据计算结果修改CSS的变量
        videophoneContainer.style.setProperty("--hungup-point-x", x + "px");
        videophoneContainer.style.setProperty("--hungup-point-y", y + "px");

    };
    //初始触发，每次窗口改变大小的时候触发
    modifyCenterPoint();
    window.addEventListener("resize", modifyCenterPoint);


    receiveBtn.addEventListener("click", function () {
        receiveBtn.className = "calling";
        finishBtn.className = "calling";
    });
    finishBtn.addEventListener("click", function () {
        videophoneContainer.className = "end";
    });
})