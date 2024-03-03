class Box {
    content = "";
    sameAs(other) {
        return other.content === this.content;
    }
}
class DerivedBox extends Box {
    otherContent = "?";
}
// this类型与编写other:Box不同
// 如果你有一个派生类，
// 它的sameAs方法现在只接受同一派生类的其他实例：
const base = new Box();
const derived = new DerivedBox();
// derived.sameAs(base);
