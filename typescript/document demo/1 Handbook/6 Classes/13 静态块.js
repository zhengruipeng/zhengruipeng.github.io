class Foo {
    static #count = 0;
    get count() {
        return Foo.#count;
    }
    static {
        try {
            Foo.#count += 3;
        }
        catch { }
    }
}
