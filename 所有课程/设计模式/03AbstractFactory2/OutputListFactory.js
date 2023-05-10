import {ListFactory} from "./ListFactory.js";
import {OutputPurchaseList} from "./OutputPurchaseList.js";
import {OutputSaleList} from "./OutputSaleList.js";
import {OutputStockList} from "./OutputStockList.js";

let OutputListFactory = class extends ListFactory {
    /*    + createCoffee Coffee
    + createDessert Dessert*/
    createPurchase(name, money) {
        return new OutputPurchaseList(name, money);
    }

    createSale(name, money) {
        return new OutputSaleList(name, money);

    }

    createStock(name, money) {
        return new OutputStockList(name, money);

    }
}

export {OutputListFactory}