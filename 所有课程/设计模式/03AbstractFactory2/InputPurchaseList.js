import {PurchaseList} from "./PurchaseList.js";

let InputPurchaseList = class extends PurchaseList {
    name;
    money;

    getInfo() {
        return `InputPurchaseList: name = ${this.name}, money = ${this.money}`;
    }

    constructor(name, money) {
        super();
        this.name = name;
        this.money = money;

    }
}

export {InputPurchaseList}