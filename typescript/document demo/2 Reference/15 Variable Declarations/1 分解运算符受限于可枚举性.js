let o = {
    a: 1,
};
Object.defineProperty(o, "b", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 2
});
let oShallowCopy = { ...o };
console.log(oShallowCopy);
