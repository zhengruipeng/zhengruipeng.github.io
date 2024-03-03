function makeObject(desc) {
    let data = desc.data || {};
    let methods = desc.methods || {};
    return { ...data, ...methods };
}
let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx, dy) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
        },
    },
});
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
console.log(obj.x, obj.y);
