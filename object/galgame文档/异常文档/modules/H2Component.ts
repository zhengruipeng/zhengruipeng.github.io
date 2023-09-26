class H2Component extends HTMLElement {
    public __title: string;

    public initAttrs(): void {
        const title = this.getAttribute("title") ?? this.__title;
        if (!title) return;

        let spanElement = this.querySelector("span[slot='title']");
        if (!spanElement) {
            spanElement = document.createElement("span");
            spanElement.slot = "title";
            this.appendChild(spanElement);
        }
        spanElement.innerHTML = title;
    }

    set title(title: string) {
        this.__title = title;
        this.initAttrs();
    }

    get title() {
        return this.__title;
    }

    constructor() {
        super();

        const h2Template: HTMLTemplateElement = document.querySelector("#h2-template");
        const h2Root: Node = h2Template.content.cloneNode(true);

        this.initAttrs();

        const shadowRoot: ShadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(h2Root);
    }
}

customElements.define("gal-h2", H2Component);

export {H2Component}