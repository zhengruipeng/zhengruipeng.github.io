const debug = false;
let output = function (...msg){
    if(!debug)return false;

    console.log(...msg);
}

let Cookie = class extends Object {
    #document = null;

    toJSON() {
        let obj = {};
        let cookie = this.#document.cookie;
        if (cookie === "") return {};

        let entries = cookie.split(";");
        for (let entry of entries) {
            let [key, value] = entry.trim().split("=");
            if (value) {
                obj[key] = value;
            } else {
                if (key.trim() !== "") {
                    obj[key] = true;
                }
            }
        }
        return obj;
    }
    toString(){
        return this.#document.cookie;
    }

    * [Symbol.iterator]() {
        let cookie = this.#document.cookie;
        let entries = cookie.split(";");
        for (let entry of entries) {
            let [key, value] = entry.trim().split("=");
            if (value) {
                yield [key, value]
            } else {
                if (key.trim() !== "") {
                    yield [key, true]
                }
            }
        }
    }

    //测试未通过
    clear() {
        this.set("max-age", 0);
        this.set("expires", "Thu, 01 Jan 1970 00:00:00 UTC");
    };

    //测试未通过
    delete(key) {
        if (!this.has(key)) return false;

        let cookie = this.#document.cookie;
        let entries = cookie.split(";");
        let index = 0;
        for (let entry of entries) {

            let [k, v] = entry.trim().split("=");
            if (key === k) {
                entries.splice(index, 1);

            }
            index++;
        }
        output(entries.join(';'))
        this.#document.cookie = entries.join(';');
        return
    };

    * entries() {
        let cookie = this.#document.cookie;
        let entries = cookie.split(";");
        for (let entry of entries) {
            let [key, value] = entry.trim().split("=");
            if (value) {
                yield [key, value]
            } else {
                if (key.trim() !== "") {
                    yield [key, true]
                }
            }
        }
    };

    forEach(callback/*Function*/) {
        let cookie = this.#document.cookie;
        let entries = cookie.split(";");
        for (let entry of entries) {
            let [key, value] = entry.trim().split("=");
            callback(key, value ? value : true, entries)
        }
    }

    get(key) {
        return this.toJSON()[key];
    }

    has(key) {
        return key in this.toJSON();
    };

    * keys() {
        for (let key of Object.keys(this.toJSON())) {
            yield key;
        }
    };

    set(key, value) {
        if (!value ||
            typeof value === "boolean" && value) {
            this.#document.cookie = encodeURIComponent(key);
            return;
        }

        if (!this.has(key)) {
            this.#document.cookie = encodeURIComponent(key + "=" + value);

        } else {

            let cookie = this.#document.cookie;
            let entries = cookie.split(";");

            let index = 0;
            for (let entry of entries) {

                let [k, v] = entry.trim().split("=");
                if (key === k) {
                    // entries = entries.splice(index,1);
                    entries[index] = encodeURIComponent(`${key}=${value}`);
                }
                index++;
            }
            output(entries)
            this.#document.cookie = entries.join(';');
        }


    };

    * values() {
        for (let value of Object.values(this.toJSON())) {
            yield value;
        }
    };

    constructor(document) {
        super();
        this.#document = document;
    }
}

export {Cookie}