import {GameTable} from "../model/GameTable.js";
import {GameItem} from "../model/GameItem.js";
import {TableComponent} from "../modules/TableComponent.js";
import {H1Component} from "../modules/H1Component.js";
import {H2Component} from "../modules/H2Component.js";
import {Warning} from "../warning/Warning.js";
import {Exception} from "../exception/Exception.js";

class DataDriver extends Object {
    public title: string;

    public tables: GameTable[];

    render() {
        const fragment: DocumentFragment = document.createDocumentFragment();

        const h1: H1Component = new H1Component()
        h1.title = this.title;
        document.body.appendChild(h1);

        this.tables.forEach((gameTable: GameTable): void => {
            const h2: H2Component = new H2Component()
            h2.title = gameTable.title;

            const table: TableComponent = new TableComponent();
            table.title = gameTable.title;

            gameTable.items.forEach((gameItem: GameItem): void => {
                let tr = table.insertRow(gameItem.name, gameItem.error.summary, gameItem.error.info);

                if (gameItem.error instanceof Warning) {
                    tr.classList.add("warning");
                } else if (gameItem.error instanceof Exception) {
                    tr.classList.add("exception");
                }

            });

            document.body.appendChild(h2);
            document.body.appendChild(table);
        });

        document.body.appendChild(fragment);
    }

    constructor(title: string, tables: GameTable[]) {
        super();
        this.title = title;
        this.tables = tables;
    }
}

export {DataDriver}