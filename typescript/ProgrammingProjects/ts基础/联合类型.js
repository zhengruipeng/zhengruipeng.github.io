"use strict";
class CheckRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    inRange(num) {
        if (typeof num === "string") {
            num = parseFloat(num);
        }
        if (num > this.start && num < this.end)
            return true;
        return false;
    }
}
let range = new CheckRange(1, 10);
console.log(range.inRange("5"));
console.log(range.inRange("11"));
