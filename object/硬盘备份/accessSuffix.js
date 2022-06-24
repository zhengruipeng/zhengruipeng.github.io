let AccessSuffix = [
    "rar",
    "zip",
    "7z",
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "txt",
    "jpg"
];
let isInAccessSuffix = function (suffix){
    if(suffix.includes("."))suffix = suffix.substring(suffix.lastIndexOf(".")+1);
    return AccessSuffix.includes(suffix);
};
export {isInAccessSuffix}