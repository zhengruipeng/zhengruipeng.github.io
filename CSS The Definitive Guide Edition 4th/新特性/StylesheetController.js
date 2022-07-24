let StylesheetController = function (cssRule){
    this.cssRule = cssRule;
    this.entriesMap = null;
    this.elementEntryMap = null;
    this.initEntries(cssRule.cssText);
    console.log(this.entriesMap);
};
StylesheetController.prototype = {};
StylesheetController.prototype.constructor = StylesheetController;
StylesheetController.prototype.inputChangeEvent = function (that){
    let entry = that.elementEntryMap.get(this.parentElement);
    let [key,value] = entry;
    that.cssRule.style[key] = this.value;
};
StylesheetController.prototype.initEntries = function (/*String*/ cssText){
    // console.log(cssRule);
    let regexp = /([^:|^{]+):([^;|^}]+);/g;
    let entries = cssText.match(regexp);
    let entriesMap = [];
    entries.forEach(entry => {
        let key = entry.substring(0,entry.indexOf(":")).trim();
        let value = entry.substring(entry.indexOf(":")+1).trim();
        value = value.substr(0,value.length-1);
        // console.log(key,value);
        entriesMap.push([key,value]);
    });
    this.entriesMap = entriesMap;
    return this;
};
StylesheetController.prototype.initControls = function (container = null){
    if(!this.entriesMap){
        console.warn("you should create the entries at first by call initEntries() method");
        return this;
    }
    if(!container?.appendChild){
        console.warn("the container element is invalid");
        return this;
    }
    /*this.shadowRoot = container.attachShadow({mode:"open"});
    this.shadowRoot.innerHTML = `
        <style>

        </style>
    `;*/
    this.elementEntryMap = new Map();
    let fragment = document.createDocumentFragment();
    this.entriesMap.forEach((entry,index,arr) => {
        let [key,value] = entry;
        // let htmlContent = `<label>${key}: <input type="text" value="${value}" /></label>`;
        const labelEle = document.createElement("label");
        const inputEle = document.createElement("input");
        const brEle = document.createElement("br");
        inputEle.value = value;
        inputEle.id = key+"-input";
        inputEle.onchange = this.inputChangeEvent.bind(inputEle,this);
        labelEle.appendChild(document.createTextNode(key+": "));
        labelEle.appendChild(inputEle);
        fragment.appendChild(labelEle);
        fragment.appendChild(brEle);


        this.elementEntryMap.set(labelEle,entry);

    });

    container.appendChild(fragment);
    return this;
};

export {StylesheetController};