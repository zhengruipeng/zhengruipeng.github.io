function create(c) {
    return new c();
}
//另一个比较复杂的例子
class BeeKeeper {
    hasMask = true;
}
class ZooKeeper {
    nametag = "Mikle";
}
class Animal {
    numLegs = 4;
}
class Bee extends Animal {
    numLegs = 6;
    keeper = new BeeKeeper();
}
class Lion extends Animal {
    keeper = new ZooKeeper();
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
