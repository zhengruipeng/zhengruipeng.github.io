import { BinarySearch } from "./BinarySearch.js";
import { QuickSort } from "./QuickSort.js";
class Adapter {
    search(arr, target) {
        let bs = new BinarySearch();
        return bs.binarySearch(arr, target);
    }
    sort(arr) {
        let qs = new QuickSort();
        return qs.quickSort(arr);
    }
}
export { Adapter };
