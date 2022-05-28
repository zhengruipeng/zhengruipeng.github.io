const panel = document.getElementById("indexeddb-panel");
let println = function (...msgs){
    msgs.forEach(msg => {
        panel.innerHTML += `${msg}<br />`;
    })
};
let print = function (...msgs){
    msgs.forEach(msg => {
        panel.innerHTML += `${msg}`;
    })
};
let io = {
    println,
    print,
}
export {io};