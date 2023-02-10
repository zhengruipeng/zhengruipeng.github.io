let JSONParseRangeController = class extends Object {
    min = 0;
    max = 5;
    step = 1;

    props = {};

    node = null

    constructor(min, max, step) {
        super();
        this.min = min;
        this.max = max;
        this.step = step;
    }

    render() {
        let div = document.createElement("div");
        div.innerHTML = `
            <input type="range" min="${this.min}" max="${this.max}" step="${this.step}" />
        `;
        this.node = div.children[0];

        for (let name in this.props) {
            this.node[name] = this.props[name];
        }
        return this.node;
    }
};


let JSONParserEvent = class extends Object {
    key;
    value;
    json;
    jsonParser;
    cancelBubble = false;

    constructor({key, value, json, jsonParser}) {
        super();
        this.key = key;
        this.value = value;
        this.json = json;
        this.jsonParser = jsonParser;
    }
}
JSONParserEvent.prototype.stopPropagation = function () {
    this.cancelBubble = true;
};

let stringToPrimary = function (str) {
    //自动转化数字类型
    let temp = Number.isNaN(str - 0) ? str : str - 0;

    //自动转化布尔类型
    (temp === "true" || temp === "false") &&
    (temp = (temp === "true"));

    return temp;
};
/*private*/
let defaultInputEvent = function (ev, that) {
    let temp = stringToPrimary(this.value)

    that.json[this.name] = temp;

    that.onJsonChange && that.onJsonChange(new JSONParserEvent({
        json: that.json,
        value: temp,
        key: this.name,
        jsonParser: that
    }));
};

let JSONParserEventTarget = class extends Object {
    #events = [];

    addEventListener(callback, bubble) {
        this.#events.push(callback);
    }

    removeEventListener(callback) {
        let index = this.#events.indexOf(callback);
        if (index === -1) return false;

        //删除传入的函数
        this.#events = this.#events.splice(index, 1);
    }

    runEvents() {
        this.#events.forEach(event => {
            event()
        })
    }
}

let JSONParser = class extends JSONParserEventTarget {
    tableContainer = null;
    json = {};
    // jsonToCell = new Map();
    valueToJson = new Map();
    cellToJson = new Map();
    children = [];
    parent = null;

    constructor(json) {
        super();
        this.json = json;
    };

    initTable(outside = document.body) {
        let container = document.createElement("section");
        container.className = "table-container";
        this.tableContainer = container;

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>key</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        `;

        const tbody/*HTMLTbodyElement*/ = container.querySelector("tbody");

        for (let name in this.json) {
            this.valueToJson.set(this.json[name], name);

            let tr = document.createElement("tr");

            let tdName = document.createElement("td");
            tdName.innerHTML = `<input type='checkbox' id='${name}Using' checked >`;
            tdName.innerHTML += name;
            this.cellToJson.set(tdName, name);


            let tdValue = document.createElement("td");

            //当当前值为JSONParserRangeController的时候则创建一个下拉菜单
            if (this.json[name] instanceof JSONParseRangeController) {
                let rangeNode = this.json[name];
                
                tdValue.innerHTML = rangeNode.render();
                
                console.log(tdValue.inner)
                let that = this;
                tdValue.children[0].addEventListener("input", function (ev) {
                    defaultInputEvent.call(this, ev, that);
                });

            } else if (this.json[name] instanceof Array) {
                tdValue.innerHTML = `
                        <select name="${name}" class="json-input">
                            ${(function (data) {

                    let res = "";

                    data.forEach(val => {
                        res += "<option>" + val + "</option>";
                    });
                    return res;

                })(this.json[name])}
                        </select>
                        
                `;

                let that = this;
                tdValue.children[0].addEventListener("input", function (ev) {
                    defaultInputEvent.call(this, ev, that);
                });

            } else if (this.json[name] instanceof Object) {

                //当json值为对象的时候就再建一张表
                const jsonParser = new JSONParser(this.json[name]);
                jsonParser.initTable(tdValue);
                jsonParser.parent = this;

                let that = this;

                //使用一个Symbol量去存储客户传过来的事件对象
                let customJsonChangeEventSymbol = Symbol.for['customJsonChangeEvent']

                //检测注册时间的属性
                Object.defineProperty(jsonParser, "onJsonChange", {
                    //当设置此事件的时候就把传过来的函数对象储存到指定的Symbol之中
                    set: function (func) {
                        jsonParser[customJsonChangeEventSymbol] = func;
                    },
                    //当需要获取的时候新封装一个函数
                    get: _ => {
                        //默认冒泡函数，绑定jsonParser当不是最上层表格的时候一直向上冒泡
                        let defaultBubbleEvent = function (ev) {
                            let that2 = this;

                            //如果不是祖先对象的话则触发事件
                            if (!ev.cancelBubble && this === ev.jsonParser)
                                that.jsonChange(new JSONParserEvent({
                                    json: that2.parent.json,
                                    key: name,
                                    value: ev.json,
                                    jsonParser: that
                                }));
                        }.bind(jsonParser);

                        //返回一个函数对象，当用户调用的时候先触发储存在Symbol属性中的自定义函数事件
                        //之后再触发默认冒泡事件
                        return function (ev) {
                            jsonParser[customJsonChangeEventSymbol] ? jsonParser[customJsonChangeEventSymbol](ev) : null;
                            defaultBubbleEvent(ev)
                        }
                    },
                    configurable: true,
                    enumerable: true
                })

                this.children.push({jsonParser, json: this.json[name]})
            }
            //当json值为字符串的时候按照输入框进行显示
            else {
                let temp = stringToPrimary(this.json[name])

                if (typeof this.json[name] === "number") {
                    tdValue.innerHTML = `
                         <input type="number" value="${this.json[name]}" name="${name}"
                          class="json-input" id="${this.json[name]}" />
                     `;
                } else if (typeof this.json[name] === "boolean") {
                    tdValue.innerHTML = `
                       
                         <input type="checkbox" value="${this.json[name]}" name="${name}"
                          class="json-input" id="${this.json[name]}1" />
                     `;
                    let checkbox = tdValue.children[0];
                    //把初始的布尔值设定成选中情况
                    if (this.json[name]) checkbox.checked = true;

                    //多选时并不会自动更改元素的value值，所以需要监听事件手动修改
                    checkbox.addEventListener("change", function () {
                        //当更改时值会相反
                        this.value = !this.checked;
                    })
                } else if (typeof this.json[name] === "string") {
                    tdValue.innerHTML = `
                         <input type="text" value="${this.json[name]}" name="${name}"
                          class="json-input" id="${this.json[name]}" />
                     `;
                }

                let that = this;

                tdValue.children[0].addEventListener("input", function (ev) {
                    defaultInputEvent.call(this, ev, that);
                });
            }

            this.cellToJson.set(tdValue, this.json[name]);

            tr.appendChild(tdName);
            tr.appendChild(tdValue);

            //监听是否选用当前条目的多选框
            let that = this;
            let usingCheck = tdName.children[0];
            usingCheck.onchange = function (ev) {
                defaultInputEvent.call(tdValue.children[0], ev, that);
            }

            tbody.appendChild(tr);
        }

        outside.appendChild(container);
    };

    toJSON() {

        const that = this;
        const table/*HTMLTbodyElement*/ = that.tableContainer.querySelector("table");

        let getTableValue = function (table) {
            // const table/*HTMLTbodyElement*/ = that.tableContainer.querySelector("table");
            const tbody = table.querySelector("tbody");
            const trs = Array.from(tbody.children);
            let res = {};

            trs.forEach(function (tr, index, array) {
                let usingChecked = tr.cells[0].children[0];
                let key = tr.cells[0].innerText;
                let value;

                if (!usingChecked.checked) return false;

                //当当前值是一个数组或者是一个字符串可以直接取值的时候
                if (tr.cells[1].querySelector("table") === null) {
                    value = tr.cells[1].children[0].value;

                    value = stringToPrimary(value);
                }

                //当当前值是一个对象的时候
                else if (tr.cells[1].querySelector("table") !== null) {

                    let table = tr.cells[1].querySelector("table");
                    value = getTableValue(table);
                }

                res[key] = value

            });

            return res;
        };

        return getTableValue(table);
    }

    onJsonChange(ev) {

    };

    import(href) {
        let linkEle = document.createElement("link");
        linkEle.href = href;
        linkEle.rel = "stylesheet";
        linkEle.type = "text/css";
        document.head.appendChild(linkEle);
    };

    jsonChange(ev) {
        this.onJsonChange(ev || new JSONParserEvent({json: this.json, jsonParse: this}));
    }

    //用于处理冒泡时存储用户设置的JsonChange事件处理函数时使用
    [Symbol.for("customJsonChangeEvent")]() {
    }
};

export {JSONParser, JSONParseRangeController}


/*
*
*
* let jsonParser = new JSONParser(option);
        jsonParser.import("../table-default-style.css")
        jsonParser.initTable();
        // console.log(jsonParser.toJSON());
        // console.log(jsonParser.cellToJson);
        // console.log(jsonParser.json)
        // console.log(jsonParser.valueToJson)
        // console.log(jsonParser.parent)
        // console.log(jsonParser.children)
        // console.log(jsonParser.children[0].jsonParser.parent)

        jsonParser.onJsonChange = function (ev) {
            output.innerHTML = new Intl.DateTimeFormat('zh-CN-u-ca-buddhist', jsonParser.toJSON()).format(date)
        };
* */