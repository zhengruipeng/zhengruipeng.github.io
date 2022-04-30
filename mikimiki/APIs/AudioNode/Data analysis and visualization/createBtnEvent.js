let createBtn = function (document,fun){
    let button = document.createElement("button");
    button.innerHTML = "start";
    button.onclick = _ => fun.call(document,_);
    document.body.appendChild(button);
};
export default createBtn;