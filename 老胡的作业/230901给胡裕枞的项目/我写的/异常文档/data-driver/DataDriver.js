import { TableComponent } from "../modules/TableComponent.js";
import { H1Component } from "../modules/H1Component.js";
import { H2Component } from "../modules/H2Component.js";
import { Warning } from "../warning/Warning.js";
import { Exception } from "../exception/Exception.js";
class DataDriver extends Object {
    title;
    tables;
    render() {
        const fragment = document.createDocumentFragment();
        const h1 = new H1Component();
        h1.title = this.title;
        document.body.appendChild(h1);
        this.tables.forEach((gameTable) => {
            const h2 = new H2Component();
            h2.title = gameTable.title;
            const table = new TableComponent();
            table.title = gameTable.title;
            gameTable.items.forEach((gameItem) => {
                let tr = table.insertRow(gameItem.name, gameItem.error.summary, gameItem.error.info);
                if (gameItem.error instanceof Warning) {
                    tr.classList.add("warning");
                }
                else if (gameItem.error instanceof Exception) {
                    tr.classList.add("exception");
                }
            });
            document.body.appendChild(h2);
            document.body.appendChild(table);
        });
        document.body.appendChild(fragment);
    }
    constructor(title, tables) {
        super();
        this.title = title;
        this.tables = tables;
    }
}
export { DataDriver };
