// 以命名空间和类的合并模拟内部类


class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel {}
}

//用命名空间声明函数属性
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));

// 命名空间也可以用来扩展枚举的静态成员：
enum Color {
    red = 1,
    green = 2,
    blue = 4,
}
namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        } else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        } else if (colorName == "magenta") {
            return Color.red + Color.blue;
        } else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}