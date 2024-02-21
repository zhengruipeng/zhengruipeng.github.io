class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep;
    }

    isDirectory(): this is Directory {
        return this instanceof Directory;
    }

    isNetworked(): this is Networked & this {
        return this.networked;
    }

    constructor(public path: string, private networked: boolean) {
    }
}

class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}

class Directory extends FileSystemObject {
    children: FileSystemObject[];
}

interface Networked {
    host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
    fso.content;

} else if (fso.isDirectory()) {
    fso.children;
} else if (fso.isNetworked()) {
    fso.host;
}

/*
* 基于此的类型保护的一个常见用例是允许对特定字段进行惰性验证。
* 例如，当hasValue被验证为true时，这种情况会从框内的值中删除未定义的值：
* */
class Box<T> {
    value?: T;

    hasValue(): this is { value: T } {
        return this.value !== undefined;
    }
}

const box = new Box();
box.value = "Gameboy";

box.value;

if (box.hasValue()) {
    box.value;

}