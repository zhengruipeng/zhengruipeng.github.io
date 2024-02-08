class MDNExample extends HTMLDivElement {
    #__version__ = "1.0";
    #setDefaultStyle() {
        this.style.border = "#ccc solid 2px";
        this.style.borderRadius = "5px";
        this.style.padding = "10px";
        this.style.display = 'block';
    }

    setStyleSheet(styleElement) {
        const shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(styleElement);
    }

    setScript(scriptElement) {
        scriptElement.defer = true;
        scriptElement.type = "text/javascript";
        document.body.appendChild(scriptElement);
    }

    constructor() {
        super();

        const styleElements = Array.from(this.querySelectorAll("style"));
        const scriptElements = Array.from(this.querySelectorAll("script[type='text/jsx']"));
        const children = Array.from(this.childNodes);

        const shadowRoot = this.attachShadow({mode: "open"});

        styleElements.forEach(styleElement => {
            styleElement.parentElement.removeChild(styleElement);
            this.setStyleSheet(styleElement);
        });
        scriptElements.forEach(scriptElement => {
            scriptElement.parentElement.removeChild(scriptElement);
            this.setScript(scriptElement);
        });

        const title = document.createElement("p");
        title.innerHTML = "<em style='color:#aaa;user-select: none'>MDN Example</em>";
        shadowRoot.appendChild(title);

        children.forEach(child => {
            shadowRoot.appendChild(child);
        })

        this.#setDefaultStyle();
    }
}

customElements.define("mdn-example", MDNExample, {extends: "div"});


export {MDNExample}