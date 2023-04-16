let JSONParser = class extends Object{

    json = {};
    // jsonToCell = new Map();
    valueToJson = new Map();
    cellToJson = new Map();
    children = [];

    /*private*/ defaultInputEvent(ev,that){
        // let tdValue = this.parent;
        // that.cellToJson.set(tdValue,this.value);
        // console.log(that.json)

        //自动转化数字类型
        let temp = Number.isNaN(this.value - 0)?this.value:this.value - 0;

        //自动转化布尔类型
        (temp === "true" || temp === "false") &&
            (temp = (temp === "true"));


        that.json[this.name] = temp;
        // console.log(that.json)

        that.onJsonChange && that.onJsonChange({
            json:that.json,
            value:temp,
            key:this.name
        });
    };

    initTable(outside = document.body){
        let container = document.createElement("section");
        container.className = "table-container";

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

        const tbody = container.querySelector("tbody");

        for(let name in this.json){
            this.valueToJson.set(this.json[name],name);

            let tr = document.createElement("tr");

            let tdName = document.createElement("td");
            tdName.innerHTML = name;
            // this.jsonToCell.set(name,tdName);
            this.cellToJson.set(tdName,name);

            let tdValue = document.createElement("td");


                //当json值为对象的时候就再建一张表
            if(this.json[name] instanceof Object){
                const jsonParser = new JSONParser(this.json[name]);
                jsonParser.initTable(tdValue);

                let that = this;
                jsonParser.onJsonChange = function  (ev){
                    that.jsonChange(ev);
                    that.jsonChange({
                        json:that.json,
                        key: name,
                        value: that.json[name],

                    });
                };

                this.children.push({jsonParser,json:this.json[name]})
            }
            //当json值为字符串的时候按照输入框进行显示
            else{
                /*//自动转化数字类型
                let temp = Number.isNaN(this.json[name] - 0)?this.json[name]:this.json[name] - 0;

                //自动转化布尔类型
                (temp === "true" || temp === "false") &&
                (temp = (temp === "true"));*/

               /* if(typeof this.json[name] === "number"){
                    tdValue.innerHTML = `
                        <input type="number" value="${this.json[name]}" name="${name}"
                         class="json-input" id="${this.json[name]}" />
                    `;
                }else if(typeof this.json[name] === "boolean"){
                    tdValue.innerHTML = `
                        <input type="radio" value="true" name="${name}"
                         class="json-input" id="${this.json[name]}1" />
                         <input type="radio" value="false" name="${name}"
                         class="json-input" id="${this.json[name]}2" />
                    `;
                }else{
                    tdValue.innerHTML = `
                        <input type="text" value="${this.json[name]}" name="${name}"
                         class="json-input" id="${this.json[name]}" />
                    `;
                }*/

                tdValue.innerHTML = `
                        <input type="text" value="${this.json[name]}" name="${name}"
                         class="json-input" id="${this.json[name]}" />
                    `;

                let that = this;
                tdValue.children[0].addEventListener("input",function (ev){
                    that.defaultInputEvent.call(this,ev,that);

                });
            }


                // this.jsonToCell.set(this.json[name],tdValue);
            this.cellToJson.set(tdValue,this.json[name]);

            tr.appendChild(tdName);
            tr.appendChild(tdValue);

            tbody.appendChild(tr);
        }

        outside.appendChild(container);
    };

    constructor(json) {
        super();

        this.json = json;

    };

    onJsonChange(ev){

    };

    import(href){
        let linkEle = document.createElement("link");
        linkEle.href = href;
        linkEle.rel = "stylesheet";
        linkEle.type = "text/css";
        document.head.appendChild(linkEle);
    };

    jsonChange(ev){
        this.onJsonChange(ev||{json:this.json});
    }
};

export {JSONParser}