let ControlsUI = class extends Object{
    controlsData = {};
    controlsEle = null;
    cssText = {};
    initDefaultStyle(url,cssText){
        fetch(url).then(response => response.text())
            .then(text => {
                let style = document.createElement("style");
                style.innerHTML = text;
                document.head.appendChild(style);
            });
        this.cssText = cssText;
        return this;
    }
    initControls(container){
        let fragment = document.createDocumentFragment();
        let header = document.createElement("header");
        for(let name in this.cssText){

            header.style[name] = this.cssText[name];
        }

        fragment.appendChild(header);
        for (let property in this.controlsData){
            let nav = document.createElement("nav");
            nav.innerHTML = `<p>${property}</p>`;
            // document.createElementNS("http://www.w3.org/2000/svg")
            if(this.controlsData[property]?.children){
                let ul = document.createElement("ul");
                let temp = document.createElement("div");
                temp.innerHTML = this.controlsData[property].children;
                Array.from(temp.children).forEach(ele => {
                    let li = document.createElement("li");
                    li.appendChild(ele);
                    ul.appendChild(li);
                });
                nav.appendChild(ul);
            }else{
                let ul = document.createElement("ul");
                let li = document.createElement("li");
                li.innerHTML = `<p>${property}</p>`
                ul.appendChild(li);
                nav.appendChild(ul);

            }
            header.appendChild(nav);
        }
        container?container.appendChild(fragment):document.body.appendChild(fragment);
        this.controlsEle = header;
        this.bindItemEvent({
            click:function  (){
                Array.from(this.parentNode.children).forEach(child => {
                    child.classList.remove("selected");
                });
                this.classList.add("selected");
            },
        });
        return this;
    }
    bindItemEvent(events = {},target){
        let navs = Array.from(this.controlsEle.querySelectorAll("nav"));
        for(let event in events){
            navs.forEach(nav => {
                let ele = nav;
                if(target){
                    ele = nav.querySelector(target);
                }
                // nav.addEventListener(event,events[event]);
                ele?.addEventListener(event,function (ev){
                    events[event].call(this,ev,this.querySelector("p"),this.querySelector("ul"));
                });
            });
        };

        return this;

    }
    constructor(controlsData) {
        super();
        this.controlsData = controlsData;

    }
};
export {ControlsUI}