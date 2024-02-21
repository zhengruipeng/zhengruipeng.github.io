// 这个工具类型不会返回一个转换后的类型。
// 相反，它作为一个上下文中的 this 类型的标记。
// 注意，必须启用 noImplicitThis 标志才能使用这个工具。
type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return {...data, ...methods} as D & M;
}

let obj = makeObject({
    data: {x: 0, y: 0},
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
        },
    },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
console.log(obj.x, obj.y)