/*在结构类型系统中，没有成员的类型通常是其他类型的超类型。*/
class Empty {}

function fn(x: Empty) {
    // can't do anything with 'x', so I won't
}

// All OK!
fn(window);
fn({});
fn(fn);