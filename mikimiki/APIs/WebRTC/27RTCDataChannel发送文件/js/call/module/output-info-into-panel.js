let PanelOutput;
(function (){
    const panel = document.getElementById("indexeddb-panel");

    panel.ondblclick = function (){
        this.classList.toggle("fullscreen");
    };

    let println = function (...msgs){
        msgs.forEach(msg => {
            panel.innerHTML += `${msg}`;
        });
        panel.innerHTML += `<br />`;

    };
    let print = function (...msgs){
        msgs.forEach(msg => {
            panel.innerHTML += `${msg}`;
        })
    };
    PanelOutput = {
        println,
        print,
    }
})();
export {PanelOutput};