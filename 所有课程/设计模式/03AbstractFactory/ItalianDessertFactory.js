import {LatteCoffee} from "./LatteCoffee.js";
import {Tiramisu} from "./Tiramisu.js";
import {DessertFactory} from "./DessertFactory.js";

let ItalianDessertFactory = class extends DessertFactory {
    /*    + createCoffee Coffee
    + createDessert Dessert*/
    createCoffee() {
        return new LatteCoffee();
    }

    createDessert() {
        return new Tiramisu();
    }
}

export {ItalianDessertFactory}