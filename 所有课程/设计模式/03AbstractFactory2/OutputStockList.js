import {StockList} from "./StockList.js";

let OutputStockList = class extends StockList {
    name;
    money;

    getInfo() {
        return `OutputStockList: name = ${this.name}, money = ${this.money}`;
    }

    constructor(name, money) {
        super();
        this.name = name;
        this.money = money;

    }
}

export {OutputStockList}