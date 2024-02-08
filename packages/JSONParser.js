/*
* 说明：
* 1：制作插件的时候应该在提供value的元素上设置class="provider"
* 2：制作插件的时候如果provider没有input事件应手动触发
* */
let JSONParseCustomController = class extends Object {
    props;

    node = null

    constructor(node, props = {}) {
        super();
        this.node = node;
        this.props = props;
    }

    render() {
        for (let name in this.props) {
            this.node[name] = this.props[name];
        }

        //如果没有提供属性值的元素的话就获取可能提供值的元素，
        // 如果没有的话直接将class赋值给node
        if (!this.node.querySelector(".provider")) {
            if (this.node.querySelector("input")) {
                this.node.querySelector("input").classList = "provider";
            } else if (this.node.querySelector("select")) {
                this.node.querySelector("select").classList = "provider";
            } else if (this.node.querySelector("textarea")) {
                this.node.querySelector("textarea").classList = "provider";
            } else {
                this.node.classList = "provider";
            }
        }
        return this.node;
    }
};
//用于JSONParser内容的input type="range"元素插件
let JSONParseRangeController = class extends JSONParseCustomController {
    min = 0;
    max = 5;
    step = 1;

    constructor(min, max, step, props = {}) {
        super(null, props);
        this.min = min;
        this.max = max;
        this.step = step;
    }

    render() {
        let div = document.createElement("div");
        div.innerHTML = `
            <label>
                ${this.min}
                <input type="range" class="provider" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.min}" />
                ${this.max}
            </label>
        `;
        this.node = div.children[0];

        return super.render();
    }
};
let JSONParseDateController = class extends JSONParseCustomController {
    constructor(props = {}) {
        super(null, props);
    }

    render() {
        let div = document.createElement("div");
        div.innerHTML = `
            <label>
                <input type="date" class="provider" />
            </label>
        `;
        this.node = div.children[0];

        return super.render();
    }
};

let JSONParseTimeController = class extends JSONParseCustomController {
    constructor(props = {}) {
        super(null, props);
    }

    render() {
        let div = document.createElement("div");
        div.innerHTML = `
            <label>
                <input type="time" class="provider" />
            </label>
        `;
        this.node = div.children[0];

        return super.render();
    }
};

//描述JSONChange事件的Event对象
let JSONParserEvent = class extends Event {
    key;        //更改的键
    value;      //更改的值
    json;       //更改的对象
    jsonParser;     //负责监视的jsonParser对象
    cancelBubble = false;       //是否将时间冒泡到父表格

    //构造函数为基本赋值操作
    constructor({key, value, json, jsonParser}) {
        super("jsonchange");
        this.key = key;
        this.value = value;
        this.json = json;
        this.jsonParser = jsonParser;
    }
}
//停止冒泡
JSONParserEvent.prototype.stopPropagation = function () {
    this.cancelBubble = true;
};

/*
* @name :stringToPrimary
* @params :string str
* @context :any
* @return :number|boolean|string
* @description: 将字符串类型改为相应基础值
* */
let stringToPrimary = function (str) {
    //自动转化数字类型
    let temp = Number.isNaN(str - 0) ? str : str - 0;

    //自动转化布尔类型
    (temp === "true" || temp === "false") &&
    (temp = (temp === "true"));

    return temp;
};
/*private*/

/*
* @name :defaultInputEvent
* @params :InputEvent|ChangeEvent ev, JSONParser that
* @context :HTMLElement
* @description: 将修改的值传到原本的对象中并且
* 触发JSONParser的onJsonChange事件
* 生成JSONParserEvent对象
* */
let defaultInputEvent = function (ev, that) {
    let temp = stringToPrimary(this.value)

    that.json[this.name] = temp;

    const event = new JSONParserEvent({
        json: that.json,
        value: temp,
        key: this.name,
        jsonParser: that,
        isTrusted: true
    })

    that.onJsonChange && that.onJsonChange(event);
    that.dispatchEvent(event);
};

//核心解析类
let JSONParser = class extends EventTarget {
    tableContainer = null;      //生成表格的父元素
    json = {};      //监视的json对象
    // jsonToCell = new Map();
    valueToKey = new Map();     //维护的一个从value到键的映射（因为可能涉及覆盖，所以不全）
    cellToKey = new Map();      //维护的一个从单元格到键的映射
    children = [];      //当前表格的所有子表格的维护数组
    parent = null;      //当前表格的父表格

    //将要监视的json对象传入属性中
    constructor(json) {
        super();
        this.json = json;
    };

    //生成表格
    initTable() {
        //首先创建一个容器装载表格
        let container = document.createElement("section");
        container.className = "table-container";
        this.tableContainer = container;

        //创建表格体
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

        //解析json对象
        for (let name in this.json) {
            //设置valueToKey的映射信息
            this.valueToKey.set(this.json[name], name);

            //为每一个键值对创建一行
            let tr = document.createElement("tr");

            //并且创建两个单元格
            let tdName = document.createElement("td");
            //创建的第一个单元格中县创建一个多选框，用来表示此属性是否使用
            tdName.innerHTML = `<input type='checkbox' id='${name}-using' checked >`;
            //属性名
            tdName.innerHTML += name;
            //设置cellToKey的映射
            this.cellToKey.set(tdName, name);


            //创建第二个单元格
            let tdValue = document.createElement("td");

            //解析属性值，根据属性值类型的不同生成不同的HTML元素
            //当当前值为JSONParserRangeController的时候则创建一个滑动栏
            if (this.json[name] instanceof JSONParseCustomController) {
                let customNode = this.json[name];
                tdValue.appendChild(customNode.render());

                let that = this;
                let provider = tdValue.querySelector('.provider') || tdValue.children[0];
                // console.log(provider)
                provider.name = name;
                provider.addEventListener("input", function (ev) {
                    defaultInputEvent.call(this, ev, that);
                });

            }
            //当当前值为Array的时候则创建一个下拉菜单
            else if (this.json[name] instanceof Array) {
                tdValue.innerHTML = `
                        <select name="${name}" class="json-input" id="jsonparse-${name}">
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

            }
            //当当前值为Object的时候则创建一个子表格
            else if (this.json[name] instanceof Object) {
                //当json值为对象的时候就再建一张表
                //再根据当前对象值创建一个JSONParser对象并且生成表格
                const jsonParser = new JSONParser(this.json[name]);
                tdValue.appendChild(jsonParser.initTable());
                //设置新生成的表格的父表格为当前表格
                jsonParser.parent = this;

                let that = this;

                //使用一个Symbol量去存储客户传过来的事件对象
                let customJsonChangeEventSymbol = Symbol.for['customJsonChangeEvent']

                //检测注册事件的属性
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

                this.children.push(jsonParser)
            }
            //当json值为基础值的时候
            else {
                //将属性值转换为基础类型
                let temp = stringToPrimary(this.json[name])

                //如果是数字的话生成一个数字类型的输入框
                if (typeof this.json[name] === "number") {
                    tdValue.innerHTML = `
                         <input type="number" value="${this.json[name]}" name="${name}"
                          class="json-input" id="jsonparse-${name}" />
                     `;
                }
                //如果是布尔值的话生成一个多选框
                else if (typeof this.json[name] === "boolean") {
                    tdValue.innerHTML = `
                           <label>
                             <input type="checkbox" value="${this.json[name]}" name="${name}"
                              class="json-input provider" id="jsonparse-${name}" />
                             <span>${this.json[name]}</span>
                          </label>
                     `;
                    let label = tdValue.children[0];
                    let checkbox = tdValue.children[0].querySelector("input");
                    let display = tdValue.children[0].querySelector("span");
                    //把初始的布尔值设定成选中情况
                    if (this.json[name]) checkbox.checked = true;

                    //多选时并不会自动更改元素的value值，所以需要监听事件手动修改
                    checkbox.addEventListener("input", function () {
                        //当更改时值会相反
                        this.value = this.checked;
                        label.setAttribute("value", this.checked);
                        display.innerText = this.checked;
                    })
                }
                //如果是字符串的话生成一个普通的文字输入框
                else if (typeof this.json[name] === "string") {
                    tdValue.innerHTML = `
                         <input type="text" value="${this.json[name]}" name="${name}"
                          class="json-input" id="jsonparse-${name}" />
                     `;
                }

                let that = this;

                //当输入的时候触发默认的输入事件
                tdValue.children[0].addEventListener("input", function (ev) {
                    defaultInputEvent.call(this, ev, that);
                });
            }

            this.cellToKey.set(tdValue, this.json[name]);

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

        // outside.appendChild(container);
        return container;
    };


    toJSON() {

        const that = this;
        const table/*HTMLTbodyElement*/ = that.tableContainer.querySelector("table");

        //用于取出所有表格中的值
        //参数是待取值的表格
        //返回值是表示表格中信息的对象
        let getTableValue = function (table) {
            // const table/*HTMLTbodyElement*/ = that.tableContainer.querySelector("table");
            //取出tbody和每一行并声明res对象
            const tbody = table.querySelector("tbody");
            const trs = Array.from(tbody.children);
            let res = {};

            //遍历表格的每一行的信息
            trs.forEach(function (tr, index, array) {
                //取出是否使用该属性的多选框，键和值
                let usingChecked = tr.cells[0].children[0];
                let key = tr.cells[0].innerText;
                let value;

                //如果多选框没选上的话返回false
                if (!usingChecked.checked) return false;

                //当当前值不是一个表格的时候
                if (tr.cells[1].querySelector("table") === null) {
                    value = tr.cells[1].children[0].value ?? tr.cells[1].querySelector('.provider').value;
                    value = stringToPrimary(value);
                }

                //当当前值是一个表格的时候就递归取出表格的值
                else if (tr.cells[1].querySelector("table") !== null) {
                    let table = tr.cells[1].querySelector("table");
                    value = getTableValue(table);
                }

                //取出值存入res
                res[key] = value

            });

            return res;
        };

        return getTableValue(table);
    }

    //占位用，此类可以生命onJsonChange事件
    onJsonChange(ev) {

    };

    //用于引入样式表
    import(href) {
        let linkEle = document.createElement("link");
        linkEle.href = href;
        linkEle.rel = "stylesheet";
        linkEle.type = "text/css";
        document.head.appendChild(linkEle);
    };


    //手动触发jsonChange事件
    jsonChange(ev) {
        this.onJsonChange(ev || new JSONParserEvent({json: this.json, jsonParse: this}));
    }

    //用于处理冒泡时存储用户设置的JsonChange事件处理函数时使用，占位
    [Symbol.for("customJsonChangeEvent")]() {
    }

    setDefaultStyle() {
        let cssText = `
            table{
                border-collapse: collapse;
            }
            td{
                border: #639 solid 3px;
                padding:.5em 1em;
            }
            
            body>section>table>thead>tr>th{
                border: #639 solid 3px;
            }
            
            td:nth-child(2)>input,
            td:nth-child(2)>select{
                padding:0 .5em;
                min-width:100px;
            }
            
            `;

        // let stylesheet = new CSSStyleSheet();
        //
        // stylesheet.replaceSync(cssText);
        // document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
        // console.log(document.adoptedStyleSheets)
        let stylesheet = document.createElement("style");
        stylesheet.innerHTML = cssText;
        document.head.appendChild(stylesheet);

    }

    render(container = document.body) {
        container.appendChild(this.initTable());
    };

    defaultInit() {
        this.setDefaultStyle();
        this.render();
    }

    set onjsonchange(func) {
        this.onJsonChange = func;
    }

    get onjsonchange() {
        return this.onJsonChange;
    }
};

export {
    JSONParser,
    JSONParseCustomController,
    JSONParserEvent,
    JSONParseRangeController,
    JSONParseDateController,
    JSONParseTimeController,
}


/*
*
*
* let jsonParser = new JSONParser(option);
        jsonParser.import("../table-default-style.css")
        document.body.appendChild(jsonParser.initTable());
        // console.log(jsonParser.toJSON());
        // console.log(jsonParser.cellToKey);
        // console.log(jsonParser.json)
        // console.log(jsonParser.valueToKey)
        // console.log(jsonParser.parent)
        // console.log(jsonParser.children)
        // console.log(jsonParser.children[0].jsonParser.parent)

        jsonParser.onJsonChange = function (ev) {
            output.innerHTML = new Intl.DateTimeFormat('zh-CN-u-ca-buddhist', jsonParser.toJSON()).format(date)
        };
* */