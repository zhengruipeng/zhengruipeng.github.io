import {DataOperation} from "./DataOperation.js";
import {BinarySearch} from "./BinarySearch.js";
import {QuickSort} from "./QuickSort.js";

class Adapter implements DataOperation {
    search(arr: Array<number>, target: number): number {
        let bs: BinarySearch = new BinarySearch();
        return bs.binarySearch(arr, target);
    }

    sort(arr: Array<number>): Array<number> {
        let qs: QuickSort = new QuickSort();
        return qs.quickSort(arr);
    }

}

export {Adapter}