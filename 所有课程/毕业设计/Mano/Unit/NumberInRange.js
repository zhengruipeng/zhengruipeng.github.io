/*
* 检测数字类型属性值，如果大于max则属性赋值为max，如果小于min同理
* */
function NumberInRange(min, max) {
    return function (target, propertyKey) {
        let v = target[propertyKey];
        if (v > max) {
            target[propertyKey] = max;
        }
        else if (v < min) {
            target[propertyKey] = min;
        }
    };
}
export { NumberInRange };
