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
        },2000);
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
        },2000);
    };
    notify = {
        clear,
        println,
        print,
    }
})();
export {notify}
