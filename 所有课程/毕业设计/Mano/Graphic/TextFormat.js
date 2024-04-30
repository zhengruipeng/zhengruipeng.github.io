class TextFormat {
    constructor(init) {
        this.textBaseline = "hanging";
        //将所有init中的值赋给this中
        Object.assign(this, init);
    }
}
export { TextFormat };
