//此功能需要修改命令行：
// tsc "5 属性装饰器.ts" --target ES5 --experimentalDecorators --emitDecoratorMetadata
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    console.log(formatString)
    // @ts-ignore
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    console.log(target, propertyKey)
    // @ts-ignore
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

let g = new Greeter('world');
console.log(g.greet())