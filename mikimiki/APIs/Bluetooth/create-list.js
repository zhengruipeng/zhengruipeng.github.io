import {List} from "./list.js"

let listInstance = new List();
let list = listInstance.initList("controller");
document.body.insertAdjacentElement("afterbegin", listInstance.list);

export {listInstance}