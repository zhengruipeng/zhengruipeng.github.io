let o = makeWatchedObject({
    a: 1, b: "2", c: true
});
o.onA(function (a) { });
o.onC(function (c) { });
