import {config} from "./config.js";
import {InputListFactory} from "./InputListFactory.js";

//main function
(function main() {
    let factory = new config.factory();

    let sale = factory.createSale(1,100);
    let purchase = factory.createPurchase(2,200);
    let stock = factory.createStock(3,300);

    console.log(factory instanceof InputListFactory ? "目前是入账账单的工厂" : "目前是出账账单的工厂")
    console.log(sale.getInfo());
    console.log(purchase.getInfo());
    console.log(stock.getInfo());
})();
