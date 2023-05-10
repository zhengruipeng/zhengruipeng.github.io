import {PurchaseList} from "./PurchaseList.js";

let OutputPurchaseList = class extends PurchaseList {
    name;
    money;

    getInfo() {
        return `OutputPurchaseList: name = ${this.name}, money = ${this.money}`;
    }

    constructor(name, money) {
        super();
        this.name = name;
        this.money = money;

    }

}

export {OutputPurchaseList}