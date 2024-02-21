interface Pingable {
    ping(): void;
}

class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}

class Ball implements Pingable {
    // Class 'Ball' incorrectly implements interface 'Pingable'.
    // Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
    pong() {
        console.log("pong!");
    }

    ping() {
    };
}

//类还可以实现多个接口，例如class C implements A, B

//它根本不改变类的类型或其方法。
// 错误的常见来源是假设子句implements将更改类类型 - 但事实并非如此！
interface Checkable {
    check(name: string): boolean;
}

class NameChecker implements Checkable {
    check(s) {
        //参数“s”隐式具有“any”类型。
        return s.toLowerCase() === "ok";
    }
}

// 同样，使用可选属性实现接口不会创建该属性：
interface A {
    x: number;
    y?: number;
}
class C implements A {
    x = 0;
}
const c = new C();
// c.y = 10;