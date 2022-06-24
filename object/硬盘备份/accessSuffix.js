let AccessSuffix = [
    "rar",
    "zip",
    "7z",
    "txt"
];
let isInAccessSuffix = function (suffix){
    if(suffix.includes("."))suffix = suffix.substring(suffix.lastIndexOf(".")+1);
    return AccessSuffix.includes(suffix);
};
export {isInAccessSuffix}