import {Commodity} from "./Commodity.js";

let CommodityTableRow = class extends Commodity {
    row;
    cells = [];

    initTr() {
        let tr = document.createElement("tr");
        this.row = tr;

        let td1 = document.createElement("td");
        td1.innerText = this.name;
        tr.appendChild(td1);
        this.cells.push(td1);

        let td2 = document.createElement("td");
        td2.innerText = this.price;
        tr.appendChild(td2);
        this.cells.push(td2);

        let td3 = document.createElement("td");
        td3.innerText = this.num;
        tr.appendChild(td3);
        this.cells.push(td3);

        this.initEvent();
        return tr;
    }

    initEvent() {
        let that = this;
        this.cells.forEach(td => {
            td.addEventListener("dblclick", function (ev) {
                ev.preventDefault();
                td.contentEditable = true;

                let updateData = function (){
                    let name = that.cells[0].innerText;
                    let price = that.cells[1].innerText;
                    let num = that.cells[2].innerText;

                    that.name = name;
                    that.price  = price;
                    that.num = num;
                }

                this.addEventListener("keydown", function (ev) {
                    if (ev.key === 'Enter') {
                        ev.preventDefault();
                        td.contentEditable = false;

                        updateData();
                    }
                });
                this.addEventListener("blur", function (ev) {
                    td.contentEditable = false;

                    updateData();
                });
            });
        });

    }

    constructor(name, price, num) {
        super(name, price, num);
    }


};

export {CommodityTableRow}