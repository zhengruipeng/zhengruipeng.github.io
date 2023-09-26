class LoadTemplate extends Object {
    public templateUrls = [
        "./component/h1-component.html",
        "./component/h2-component.html",
        "./component/table-component.html",
    ];

    public async init(): Promise<void> {
        for(let url of this.templateUrls){
            const response: Response = await fetch(url);
            const htmlText: string = await response.text()

            const domParser: DOMParser = new DOMParser();
            const doc: Document = domParser.parseFromString(htmlText, "text/html");

            document.body.appendChild(doc.documentElement.querySelector("template"));

        }
    }
}

export {LoadTemplate}