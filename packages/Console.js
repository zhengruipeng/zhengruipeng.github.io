let Console = class extends Object {
    static #panel = null;

    static #init() {
        let div = document.createElement("div");
        div.id = "panel";
        div.style.overflowY = "scroll";
        div.style.position = "fixed";
        div.style.bottom = "0";
        div.style.left = "0";
        div.style.height = "30vh";
        div.style.width = "100vw";

        let divShadowRoot = div.attachShadow({mode: "open"});

        divShadowRoot.innerHTML = `
            <style>
                #panel-log{
                    /*overflow-y:scroll;*/
                }
                p{
                    margin:0;
                    padding-left:2em;
                }
               
            </style>
            <div id="panel-log">
            
            </div>`;

        document.body.appendChild(div);
        this.#panel = divShadowRoot;
    }

    static #check() {
        if (!this.#panel) {
            this.#init();
        }
        return true;
    }

    static log(...msgs) {
        this.#check();
        let panelLog = this.#panel.querySelector('#panel-log');
        msgs.forEach(msg => {
            let p = document.createElement("p");
            p.innerText = msg + " ";
            panelLog.appendChild(p);
        })
    };

    static warn(...msgs) {
        this.#check();
        let panelLog = this.#panel.querySelector('#panel-log');
        msgs.forEach(msg => {
            let p = document.createElement("p");
            p.style.backgroundColor = "rgba(255,255,100,.7)";
            p.innerText = msg + " ";
            panelLog.appendChild(p);
        })
    };

    static error(...msgs) {
        this.#check();
        let panelLog = this.#panel.querySelector('#panel-log');
        msgs.forEach(msg => {
            let p = document.createElement("p");
            p.style.backgroundColor = "rgba(255,100,100,.7)";
            p.innerText = msg + " ";
            panelLog.appendChild(p);
        })
    };
};

export {Console};