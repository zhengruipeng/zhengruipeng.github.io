const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};
// Using the enum as a parameter
function walk(dir) { }
function run(dir) { }
walk(2 /* EDirection.Left */);
run(ODirection.Right);
