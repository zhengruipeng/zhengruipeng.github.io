import {StockList} from "./StockList.js";

let InputStockList = class extends StockList {
    name;
    money;
    getInfo() {
        return `InputStockList: name = ${this.name}, money = ${this.money}`;
    }
    constructor(name,money) {
        super();
        this.name = name;
        this.money = money;

    }
}

export {InputStockList}