class Toast extends Object {
    #__version__:number = 1.0;
    //窗口持续时间
    static #duration: number = 3000;
    //窗口是否已经初始化
    static #isInitialize: boolean = false;

    static #container: HTMLElement = (function (): HTMLElement {
        const div = document.createElement("div");
        // @ts-ignore
        div.id = "toast-container";
        div.style.display = "none";

        document.body.appendChild(div);
        return div;
    })();

    //窗口元素
    static #createElement = function (content): HTMLElement {
        const div = document.createElement("div");
        // @ts-ignore
        div.innerHTML = content;
        div.className = "pop-over";

        this.#container.appendChild(div);
        return div;
    };

    //检查是否初始化
    static async #checkInit(): Promise<void> {
        if (!this.#isInitialize) {
            let cssText: string = `
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
                border-radius: 15px;
                border: #aaffdd solid 2px;
                background-color: #aaffdd77;
                width: calc(100% - 20px);
                padding: 10px;
                text-align: center;
                line-break: strict;
                word-break: break-all;
            }
            `;

            let stylesheet: CSSStyleSheet = new CSSStyleSheet();

            stylesheet.replaceSync(cssText);
            document.adoptedStyleSheets = [stylesheet];
        }
    }

    //设置持续时间
    static setDuration(duration: number): void {
        this.#duration = duration;
    }

    //获取持续时间
    static getDuration(): number {
        return this.#duration;
    }


    //消息列表
    static #msgList: Array<string> = [];

    //渲染消息栏
    static async #render(): Promise<void> {
        if (!this.#msgList.length) return null;

        let that = this;

        const element: HTMLElement = this.#createElement(that.#msgList[that.#msgList.length - 1]);

        // @ts-ignore
        document.startViewTransition(() => {
            that.#container.style.display = "grid";
        });


        let prm: Promise<void> = new Promise(resolve => {
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


    static showMessage(msg: string): void {
        this.#checkInit().then(_ => {
            if (msg.length > 200) msg = msg.substring(0, 200);

            this.#msgList.push(msg);
            this.#render();
        });

    }

}

export {Toast}