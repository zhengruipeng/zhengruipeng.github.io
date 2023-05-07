let FormUI = class extends Object {
    formId = "";
    container = null;
    isShadowDOM = false;

    constructor(/*String*/formId,/*HTMLElement*/container,/*Boolean*/isShadowDOM) {
        super();
        if(container === undefined){
            isShadowDOM = false;
            container = document.body;
        }
        if(isShadowDOM === undefined){
            if(container === document.body){
                isShadowDOM = false;
            }else{
                isShadowDOM = true;
            }
        }

        this.formId = formId;
        this.container = container;
        this.isShadowDOM = isShadowDOM;

    };
    run(){
        let that = this;
        (function (){
            let formEle;
            if(!that.isShadowDOM){
                formEle = document.querySelector("#"+that.formId);
            }else{
                formEle = that.container.shadowRoot.querySelector("#"+that.formId);
            }
            const inputContainer = Array.from(formEle.querySelectorAll(".input-container"));
            const buttons = Array.from(formEle.querySelectorAll(".button"));

            window.addEventListener("mousemove",function (e){
                let x = e.x,y = e.y;
                formEle.style.borderImageSource =
                        `radial-gradient(300px 300px at 
                         ${x - formEle.getBoundingClientRect().left}px 
                         ${y - formEle.getBoundingClientRect().top}px,
                        var(--sec-color),var(--main-color))`;

                inputContainer.forEach(function (ele){
                    let eleRect = ele.getBoundingClientRect();
                    ele.style.borderImageSource =
                        `radial-gradient(300px 300px at
                         ${x - eleRect.left}px ${y - eleRect.top}px,
                         var(--sec-color),var(--main-color))`;
                });
                buttons.forEach(function (ele){
                    let eleRect = ele.getBoundingClientRect();
                    ele.style.borderImageSource = `
                    radial-gradient(300px 300px at 
                         ${x - eleRect.left}px ${y - eleRect.top}px,
                    ,var(--sec-color),var(--main-color))`;
                });
            });

        })();
    }
}
export {FormUI}
