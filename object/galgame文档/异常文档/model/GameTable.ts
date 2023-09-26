import {GameItem} from "./GameItem.js";

class GameTable extends Object {
    public title: string;
    public items: GameItem[];

    constructor(title: string, items: GameItem[]) {
        super();
        this.title = title;
        this.items = items;
    }
}

export {GameTable}