class H1Component extends HTMLElement {
    __title;
    initAttrs() {
        const title = this.getAttribute("title") ?? this.__title;
        if (!title)
            return;
        let spanElement = this.querySelector("span[slot='title']");
        if (!spanElement) {
            spanElement = document.createElement("span");
            spanElement.slot = "title";
            this.appendChild(spanElement);
        }
        spanElement.innerHTML = title;
    }
    set title(title) {
        this.__title = title;
        this.initAttrs();
    }
    get title() {
        return this.__title;
    }
    constructor() {
        super();
        const h1Template = document.querySelector("#h1-template");
        const h1Root = h1Template.content.cloneNode(true);
        this.initAttrs();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(h1Root);
    }
}
customElements.define("gal-h1", H1Component);
export { H1Component };
