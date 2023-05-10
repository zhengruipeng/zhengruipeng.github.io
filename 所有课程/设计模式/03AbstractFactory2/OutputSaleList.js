import {SaleList} from "./SaleList.js";

let OutputSaleList = class extends SaleList {
    name;
    money;

    getInfo() {
        return `OutputSaleList: name = ${this.name}, money = ${this.money}`;
    }

    constructor(name, money) {
        super();
        this.name = name;
        this.money = money;

    }
}

export {OutputSaleList}