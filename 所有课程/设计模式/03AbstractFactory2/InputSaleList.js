import {SaleList} from "./SaleList.js";

let InputSaleList = class extends SaleList {
    name;
    money;

    getInfo() {
        return `InputSaleList: name = ${this.name}, money = ${this.money}`;
    }

    constructor(name, money) {
        super();
        this.name = name;
        this.money = money;

    }
}

export {InputSaleList}