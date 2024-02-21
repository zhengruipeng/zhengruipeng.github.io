/*
keyof运算符采用对象类型，
并生成其键的字符串或数字文字并集。
以下类型P与类型P=“x”|“y”的类型相同
*/
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

