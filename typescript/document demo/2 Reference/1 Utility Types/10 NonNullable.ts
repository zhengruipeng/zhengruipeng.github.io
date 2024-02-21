// 从Type中排除null和undefined，构造一个新的类型。
type T0 = NonNullable<string | number | undefined>;
type T1 = NonNullable<string[] | null | undefined>;
