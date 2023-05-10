import {ListFactory} from "./ListFactory.js";
import {InputPurchaseList} from "./InputPurchaseList.js";
import {InputSaleList} from "./InputSaleList.js";
import {InputStockList} from "./InputStockList.js";

let InputListFactory = class extends ListFactory {
    /*    + createCoffee Coffee
    + createDessert Dessert*/
    createPurchase(name, money) {
        return new InputPurchaseList(name, money);
    }

    createSale(name, money) {
        return new InputSaleList(name, money);

    }

    createStock(name, money) {
        return new InputStockList(name, money);

    }
}

export {InputListFactory}