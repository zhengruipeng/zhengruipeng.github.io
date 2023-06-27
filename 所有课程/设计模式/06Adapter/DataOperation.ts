//定义了排序方法Sort(int[])和查找方法search(int[],int)
interface DataOperation {
    sort(arr: Array<number>): Array<number>;
    search(arr: Array<number>, target: number): number;
}

export {DataOperation}