function NonNegativeNumber(target, propertyKey) {
    let v = target[propertyKey];
    if (v === v && v < 0) {
        throw new RangeError();
    }
}
export { NonNegativeNumber };
