type PropEventSource<Type> = {
    [Key in keyof Type & string as `on${Capitalize<Key>}`]: (callback: (newValue: Type[Key]) => void) => void;
}

declare function makeWatchedObject<Type>(args: Type): Type & PropEventSource<Type>;

let o = makeWatchedObject({
    a: 1, b: "2", c: true
});

o.onA(function (a) {});
o.onC(function (c) {});