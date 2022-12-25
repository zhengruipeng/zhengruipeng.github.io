//此脚本用于算出摁键居中的位置
document.addEventListener("DOMContentLoaded", function () {
    const videophoneContainer = this.getElementById("videophone-container");
    const closeBtn = this.getElementById("close");



    closeBtn.addEventListener("click", function () {
        videophoneContainer.className = "end";
    })
})