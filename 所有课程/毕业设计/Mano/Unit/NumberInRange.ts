/*
* 检测数字类型属性值，如果大于max则属性赋值为max，如果小于min同理
* */
function NumberInRange(min, max) {
    return function <T extends Object, K extends keyof T>
    (target: T,
     propertyKey: K & (string | symbol)
    ) {
        let v = target[propertyKey] as number;
        if (v > max) {
            target[propertyKey] = max
        } else if (v < min) {
            target[propertyKey] = min
        }
    }
}


export {NumberInRange}