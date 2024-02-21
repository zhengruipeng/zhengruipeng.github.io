declare interface File {
    readonly eof: boolean;
    next(): number;
}
declare function getReader(): File;

for (using x = getReader(); !x.eof; x.next()) {
    // ...
}



declare class Resource{}
declare function createResource1(): Resource;
declare function createResource2(): Resource;
function* g() {
    yield createResource1();
    yield createResource2();
}

for (using x of g()) {
    // ...
}