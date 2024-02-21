// 枚举值和数字互通，但是枚举值之间不可以互相赋值
enum Status {
    Ready,
    Waiting,
}
enum Color {
    Red,
    Blue,
    Green,
}

let s = Status.Ready;
// s = Color.Green; // Error