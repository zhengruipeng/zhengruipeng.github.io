// 对修饰器缺少支持
// A decorator function which replicates the mixin pattern:
const Pausable = (target: typeof Player) => {
    return class Pausable extends target {
        shouldFreeze = false;
    };
};

@Pausable
class Player {
    x = 0;
    y = 0;
}

// The Player class does not have the decorator's type merged:
const player = new Player();
// 报错
// player.shouldFreeze;

// The runtime aspect could be manually replicated via
// type composition or interface merging.
    type FreezablePlayer = Player & { shouldFreeze: boolean };

const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;

// 对静态属性缺少支持
function base<T>() {
    class Base {
        static prop: T;
    }
    return Base;
}

function derived<T>() {
    class Derived extends base<T>() {
        static anotherProp: T;
    }
    return Derived;
}

class Spec extends derived<string>() {}

Spec.prop; // string
Spec.anotherProp; // string