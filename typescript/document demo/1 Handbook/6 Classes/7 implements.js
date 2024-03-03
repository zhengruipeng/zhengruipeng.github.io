class Sonar {
    ping() {
        console.log("ping!");
    }
}
class Ball {
    // Class 'Ball' incorrectly implements interface 'Pingable'.
    // Property 'ping' is missing in type 'Ball' but required in type 'Pingable'.
    pong() {
        console.log("pong!");
    }
    ping() {
    }
    ;
}
class NameChecker {
    check(s) {
        //参数“s”隐式具有“any”类型。
        return s.toLowerCase() === "ok";
    }
}
class C {
    x = 0;
}
const c = new C();
// c.y = 10;
