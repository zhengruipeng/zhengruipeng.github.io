namespace Animals {
    export class Zebra {}
}
namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    }
    export class Dog {}
}

// 这两个命名空间合并结果如下：
/*
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Zebra {}
  export class Dog {}
}
* */

//注意，其他命脉空间中未导出的变量其他命名空间无法访问