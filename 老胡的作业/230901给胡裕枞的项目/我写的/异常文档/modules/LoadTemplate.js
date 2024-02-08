class LoadTemplate extends Object {
    templateUrls = [
        "./component/h1-component.html",
        "./component/h2-component.html",
        "./component/table-component.html",
    ];
    async init() {
        for (let url of this.templateUrls) {
            const response = await fetch(url);
            const htmlText = await response.text();
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(htmlText, "text/html");
            document.body.appendChild(doc.documentElement.querySelector("template"));
        }
    }
}
export { LoadTemplate };
