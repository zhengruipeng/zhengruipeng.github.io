declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
type T1 = Parameters<(s: string) => void>;
type T2 = Parameters<<T>(arg: T) => T>;
type T3 = Parameters<typeof f1>;
type T4 = Parameters<any>;
type T5 = Parameters<never>;
// type T6 = Parameters<string>;
// type T7 = Parameters<Function>;
