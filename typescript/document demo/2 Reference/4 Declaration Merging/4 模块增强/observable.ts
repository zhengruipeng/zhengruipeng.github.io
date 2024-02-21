declare class Mappable<T>{
    map<U>(f: (x: T) => U): Observable<U>;
}

export class Observable<T> extends Mappable<T>{
    // ... implementation left as an exercise for the reader ...
}
