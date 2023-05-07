let Commodity = class extends Object{
    name;
    price;
    num;

    constructor(name,price,num) {
        super();
        this.name = name;
        this.price = price;
        this.num = num;
    }
};

export {Commodity}