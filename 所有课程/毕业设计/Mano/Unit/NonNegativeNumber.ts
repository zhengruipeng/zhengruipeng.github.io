function NonNegativeNumber<T extends Object, K extends keyof T>
(target: T,
 propertyKey: K & (string | symbol)
) {
    let v = target[propertyKey] as number;
    if (v === v && v < 0) {
        throw new RangeError();
    }
}

export {NonNegativeNumber}