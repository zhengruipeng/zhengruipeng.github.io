class TableComponent extends HTMLElement {
    __title;
    insertRow(name, summary, info) {
        const tbody = this.shadowRoot.querySelector("tbody");
        tbody.innerHTML += `
            <tr>
                <td>${tbody.children.length + 1}</td>
                <td>${name}</td>
                <td title="${info}">${summary}</td>
            </tr>
        `;
        return tbody.querySelector("tr:last-child");
    }
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
        const tableTemplate = document.querySelector("#table-template");
        const tableRoot = tableTemplate.content.cloneNode(true);
        this.initAttrs();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tableRoot);
    }
}
customElements.define("gal-table", TableComponent);
export { TableComponent };
