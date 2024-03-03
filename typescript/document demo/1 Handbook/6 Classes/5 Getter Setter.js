class C {
    _length = 0;
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}
//从TypeScript 4.3开始，可以使用不同类型的访问器来获取和设置。
class Thing {
    _size = 0;
    get size() {
        return this._size;
    }
    set size(value) {
        let num = Number(value);
        // Don't allow NaN, Infinity, etc
        if (!Number.isFinite(num)) {
            this._size = 0;
            return;
        }
        this._size = num;
    }
}
