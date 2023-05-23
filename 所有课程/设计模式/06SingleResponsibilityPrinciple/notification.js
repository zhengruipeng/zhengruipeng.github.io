let notify;
(function (){

    const notification = document.getElementById("notification");
    let timer;
    let clear = function (){
        notification.innerHTML = "";
    }

    let println = function (...msgs){
        clear();
        msgs.forEach(msg => {
            notification.innerHTML += `${msg}<br />`;
        })
        notification.classList.add("open");
        if(timer)clearTimeout(timer);
        timer = setTimeout(() => {
            notification.classList.remove("open");
        },1000);
    };
    let print = function (...msgs){
        clear();
        msgs.forEach(msg => {
            notification.innerHTML += `${msg}`;
        });
        notification.classList.add("open");
        if(timer)clearTimeout(timer);
        timer = setTimeout(() => {
            notification.classList.remove("open");
        },1000);
    };
    let confirm = function (...msgs){
        clear();
        if(timer)clearTimeout(timer);

        msgs.forEach(msg => {
            notification.innerHTML += `${msg}`;
        });
        notification.innerHTML += `<br />`;

        notification.classList.add("open");
        notification.classList.add("is-confirm");
        let resolve = null;
        let reject = null;
        let cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = "取消";
        cancelBtn.onclick = function (){
            resolve(false);
            notification.classList.remove("open");
            notification.classList.remove("is-confirm");
        };

        let okBtn = document.createElement("button");
        okBtn.innerHTML = "确认";
        okBtn.onclick = function (){
            resolve(true);
            notification.classList.remove("open");
            notification.classList.remove("is-confirm");
        };

        notification.appendChild(cancelBtn);
        notification.appendChild(document.createTextNode("       "));
        notification.appendChild(okBtn);


        return new Promise((res,rej) => {resolve = res;reject = rej});

    };
    notify = {
        clear,
        println,
        print,
        confirm,
    }
})();
export {notify}
