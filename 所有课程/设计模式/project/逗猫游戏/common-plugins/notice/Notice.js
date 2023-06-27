let noticeIsConstructed = false;
let Notice = class extends Object {
    noticeNode;

    /*
    * 参数1：引入样式表的地址*/
    constructor(cssHref) {
        if(noticeIsConstructed)return false;
        super();
        this.#initStyleSheet(cssHref);
        noticeIsConstructed = true;
    }

    #initEventListener() {
        let noticeClose = document.querySelector("#notice-close");
        let noticeContainer = document.querySelector("#notice-container");

        let that = this;
        let clickCB = function () {
            // noticeContainer.parentElement.removeChild(noticeContainer);
            // noticeClose.removeEventListener("click", clickCB)
            if(document.startViewTransition){
                const transition = document.startViewTransition(() => {
                    that.noticeNode.style.display = "none";
                });
            }else
                that.noticeNode.style.display = "none";

        }
        noticeClose.addEventListener("click", clickCB)
    }

    #initStyleSheet(cssHref) {
        //动态注入CSS
        fetch(cssHref)
            .then(response => response.text())
            .then(cssText => {
                let cssStyleSheet = new CSSStyleSheet();
                cssStyleSheet.replaceSync(cssText)
                document.adoptedStyleSheets = [cssStyleSheet];
            });
    }

    init() {
        let notice = document.createElement("div");
        notice.innerHTML = `
        <!--通知框容器-->
        <div id="notice-container">
            <!--通知框-->
            <section id="notice">
                <!--通知框信息-->
                <p id="notice-message">
                    奉天承运，皇帝诏曰：<br />
                    朕饿了
                </p>
                <!--通知框关闭按钮-->
                <button id="notice-close">×</button>
            </section>
        </div>`;

        this.noticeNode = notice.children[0];
        document.body.appendChild(this.noticeNode);

        this.#initEventListener();

        this.noticeNode.style.display = "none";
    }

    showMessage(...msgs) {
        let that = this;
        if(document.startViewTransition){
            const transition = document.startViewTransition(() => {
                that.noticeNode.style.display = "block";
            });
        }else
            this.noticeNode.style.display = "block";

        let noticeMessage = this.noticeNode.querySelector("#notice-message");
        //获取通知栏，
        //先清空
        noticeMessage.innerHTML = "";
        //后添加信息
        noticeMessage.innerHTML += msgs.join("<br />");
    }

}

export {Notice};