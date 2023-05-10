import {AmericanCoffee} from "./AmericanCoffee.js";
import {MatchaMousse} from "./matchaMousse.js";
import {DessertFactory} from "./DessertFactory.js";

let AmericanDessertFactory = class extends DessertFactory {
    /*    + createCoffee Coffee
    + createDessert Dessert*/
    createCoffee() {
        return new AmericanCoffee();
    }

    createDessert() {
        return new MatchaMousse();
    }
}

export {AmericanDessertFactory}