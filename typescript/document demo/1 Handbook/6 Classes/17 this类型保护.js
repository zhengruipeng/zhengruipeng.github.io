class FileSystemObject {
    path;
    networked;
    isFile() {
        return this instanceof FileRep;
    }
    isDirectory() {
        return this instanceof Directory;
    }
    isNetworked() {
        return this.networked;
    }
    constructor(path, networked) {
        this.path = path;
        this.networked = networked;
    }
}
class FileRep extends FileSystemObject {
    content;
    constructor(path, content) {
        super(path, false);
        this.content = content;
    }
}
class Directory extends FileSystemObject {
    children;
}
const fso = new FileRep("foo/bar.txt", "foo");
if (fso.isFile()) {
    fso.content;
}
else if (fso.isDirectory()) {
    fso.children;
}
else if (fso.isNetworked()) {
    fso.host;
}
/*
* 基于此的类型保护的一个常见用例是允许对特定字段进行惰性验证。
* 例如，当hasValue被验证为true时，这种情况会从框内的值中删除未定义的值：
* */
class Box {
    value;
    hasValue() {
        return this.value !== undefined;
    }
}
const box = new Box();
box.value = "Gameboy";
box.value;
if (box.hasValue()) {
    box.value;
}
