document.addEventListener("DOMContentLoaded",function (){
    const formEle = this.querySelector("form");
    const roomIdNoContainer = this.getElementById("username-container");
    const roomIdPwdContainer = this.getElementById("pwd-container");
    const inputContainer = Array.from(this.querySelectorAll(".input-container"));
    const buttons = Array.from(this.querySelectorAll(".button"));
    const backToPrePageBtn = this.getElementById("submit");
    const createRoomBtn = this.getElementById("reset");

    window.onmousemove = function (e){
        let x = e.x,y = e.y;
        formEle.style.borderImageSource = `radial-gradient(300px 300px at ${x-formEle.offsetLeft}px calc(${y-formEle.offsetTop}px),var(--sec-color),var(--main-color))`;
        inputContainer.forEach(function (ele){
            ele.style.borderImageSource = `radial-gradient(300px 300px at ${x-ele.offsetLeft}px calc(${y-ele.offsetTop}px),var(--sec-color),var(--main-color))`;
        });
        buttons.forEach(function (ele){
            ele.style.borderImageSource = `radial-gradient(300px 300px at ${x-ele.offsetLeft}px calc(${y-ele.offsetTop}px),var(--sec-color),var(--main-color))`;
        });
    };
    inputContainer.forEach(ele => {
        ele.onmouseover = function (){
            const label = this.querySelector("label");
            // const inputEle = this.querySelector("div[contenteditable]");
            const inputEle = this.querySelector("div");
            label.style.left = "10%";
            label.style.opacity = "0";
            inputEle.style.opacity = "1";
            inputEle.style.minWidth = "80%";
            inputEle.style.left = "5%";
            inputEle.focus();
        };
        ele.onmouseout = function (){
            const label = this.querySelector("label");
            // const inputEle = this.querySelector("div[contenteditable]");
            const inputEle = this.querySelector("div");
            label.style.left = "calc(50% - 2rem)";
            label.style.opacity = "1";
            inputEle.style.opacity = "0";
            // inputEle.style.minWidth = "1px";
            inputEle.style.left = "50%";
        };
        ele.onselectstart = e => e.preventDefault();

    })
})