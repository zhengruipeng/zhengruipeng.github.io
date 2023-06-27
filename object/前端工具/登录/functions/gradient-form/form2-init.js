let Form2Init = class extends Object{
    data = [];
    container = null;
    styleEle = null;
    formId = "";
    formElement = null;
    /*
    *
    * */

    constructor(/*Array*/ data,/*HTMLElement*/ container) {

        super();
        if(!container) {
            this.container = document.body;
        }else{
            this.container = container.attachShadow({mode:"open"});
        }
        this.data = data;
    }

    initControls(width,height,action,method,enctype,id){
        let formEle = document.createElement("form");
        formEle.id = id;
        formEle.action = action || "";
        formEle.method = method || "get";
        formEle.enctype = enctype || "application/x-www-form-urlencoded";
        this.formId = id;
        let cell = "... ";
        let row = cell.repeat(width);
        row = "\" "+row + " \"";
        row+= " auto ";
        let table = row.repeat(height);
        table += " / ";
        table += "1fr ".repeat(width);

        console.log(table);
        formEle.style.grid = table;

        this.data.forEach(data => {
            let key,value,startX,startY,endX,endY,movable;
            try{
                [key,value,[startX,startY],[endX,endY],movable] = data;
            }catch (e){
                console.error("the format of the data is invalid,"+data.join());
            }
            const fieldsetEle = document.createElement("fieldset");
            fieldsetEle.className = "input-container";
            movable?fieldsetEle.classList.add("movable"):movable;
            fieldsetEle.style.gridColumn = `${startX} /span ${endX}`;
            fieldsetEle.style.gridRow = `${startY} /span ${endY}`;

            const label = document.createElement("label");
            label.innerHTML = key;

            const div = document.createElement("div");
            div.innerHTML = value;

            fieldsetEle.appendChild(label);
            fieldsetEle.appendChild(div);

            formEle.appendChild(fieldsetEle);
        });
        this.container.appendChild(formEle);
        this.formElement = formEle;
        return this;
    };

    importStyleSheet(/*String*/ url = ""){
        // console.log(url);
        if(url.trim() === "")url = "./form-style.css";
        this.linkEle = document.createElement("link");
        this.linkEle.rel = "stylesheet";
        this.linkEle.type = "text/css";
        this.linkEle.href = url;
        this.container.parentNode === document.documentElement?
            document.head.appendChild(this.linkEle):
            this.container.appendChild(this.linkEle);
        return this;
    };

    runDefaultEffect(url){
        const script = document.createElement("script");
        script.type = "module";
        script.src = url || "./form-UI.js";

        document.body.appendChild(script);
        return this;
    }

}
export {Form2Init};