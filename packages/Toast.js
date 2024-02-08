class Toast extends Object {
    //窗口持续时间
    static #duration = 2000;
    //窗口是否已经初始化
    static #isInitialize = false;
    //窗口元素
    static #element = (function () {
        const div = document.createElement("div");
        // @ts-ignore
        div.popover = "manual";
        div.tabIndex = -1;
        document.body.appendChild(div);
        return div;
    })();
    //检查是否初始化
    static async #checkInit() {
        if (!this.#isInitialize) {
            let cssText = `
            ::backdrop {
            }
            
            :popover-open {
                border-radius: 15px;
                border: #ccc solid 1px;
                background-color: #fff8;
                width: 20vw;
                padding:10px;
                transform: translate(0, 30vh);
                text-align: center;
                line-break: strict;
                word-break: break-all;
                
            }`;
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
    static async #render() {
        if (!this.#msgList.length)
            return null;
        let that = this;
        this.#element.innerHTML = this.#msgList[0];
        // @ts-ignore
        document.startViewTransition(() => this.#element.showPopover());
        let prm = new Promise(resolve => {
            setTimeout(function () {
                // @ts-ignore
                document.startViewTransition(() => that.#element.hidePopover());
                that.#msgList.shift();
                resolve();
            }, that.#duration);
        });
        await prm;
        await this.#render();
    }
    static showMessage(msg) {
        this.#checkInit().then(_ => {
            if (msg.length > 200)
                msg = msg.substring(0, 200);
            this.#msgList.push(msg);
            if (this.#msgList.length === 1)
                this.#render();
        });
    }
}
export { Toast };
