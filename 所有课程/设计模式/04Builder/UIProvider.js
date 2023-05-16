let UIProvider = class extends Object{
    #mode;
    set mode(mode){
        this.#mode = mode;
    }
    get mode(){
        return this.#mode;
    }
    constructor(mode) {
        super();
        this.mode = mode
    }
    construct(){
        return (new this.mode()).render();
    }
}

export {UIProvider}