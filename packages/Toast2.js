class Toast extends Object {
    #__version__ = 1.0;
    //窗口持续时间
    static #duration = 3000;
    //窗口是否已经初始化
    static #isInitialize = false;
    static #container = (function () {
        const div = document.createElement("div");
        // @ts-ignore
        div.id = "toast-container";
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    })();
    //窗口元素
    static #createElement = function (content) {
        const div = document.createElement("div");
        // @ts-ignore
        div.innerHTML = content;
        div.className = "pop-over";
        this.#container.appendChild(div);
        return div;
    };
    //检查是否初始化
    static async #checkInit() {
        if (!this.#isInitialize) {
            let cssText = `
            #toast-container {
                position: fixed;
                left: 30vw;
                top: 10vh;
            
                z-index: 1;
                display: none;
                grid-template-columns: 40vw;
                grid-auto-rows: min-content;
            }
            
            #toast-container > .pop-over {
                border-radius: 20px;
                // border: #aaffdd solid 2px;
                width: calc(100% - 20px);
                padding: 22px 15px;
                text-align: center;
                line-break: strict;
                word-break: break-all;
                margin:10px;
                font-size:1.1em;
            }
            .log{
                background-color: #aaffaa77;
            }
            .error{
                background-color: #f007;
            }
            .warn{
                background-color: #ff07;
            }
            `;
            let stylesheet = new CSSStyleSheet();
            stylesheet.replaceSync(cssText);
            document.adoptedStyleSheets = [stylesheet];
        }
    }
    //设置持续时间
    static setDuration(duration) {
        this.#duration = duration;
    }
    //获取持续时间
    static getDuration() {
        return this.#duration;
    }
    //消息列表
    static #msgList = [];
    //渲染消息栏
    static async #render(type) {
        if (!this.#msgList.length)
            return null;
        let that = this;
        const element = this.#createElement(that.#msgList[that.#msgList.length - 1]);
        element.classList.add(type);
        // @ts-ignore
        document.startViewTransition(() => {
            that.#container.style.display = "grid";
        });
        let prm = new Promise(resolve => {
            setTimeout(function () {
                // @ts-ignore
                const transition = document.startViewTransition(() => {
                    element.parentElement.removeChild(element);
                    that.#msgList.shift();
                    if (!that.#msgList.length)
                        that.#container.style.display = "none";
                });
                resolve();
            }, that.#duration);
        });
        // this.#render();
    }
    static showMessage(msg) {
        this.#checkInit().then(_ => {
            if (msg.length > 200)
                msg = msg.substring(0, 200);
            this.#msgList.push(msg);
            this.#render("log");
        });
    }
    static showWarning(msg) {
        this.#checkInit().then(_ => {
            if (msg.length > 200)
                msg = msg.substring(0, 200);
            this.#msgList.push(msg);
            this.#render("warn");
        });
    }
    static showError(msg) {
        this.#checkInit().then(_ => {
            if (msg.length > 200)
                msg = msg.substring(0, 200);
            this.#msgList.push(msg);
            this.#render("error");
        });
    }
}
export { Toast };
