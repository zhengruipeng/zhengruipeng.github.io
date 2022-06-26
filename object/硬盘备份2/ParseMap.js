let ParseMap = class extends Object{
    __belongTo;
    elementObjMap = new Map();
    parse(obj,container){
        if(obj.__belongTo)this.__belongTo = obj.__belongTo;
        for(let name in obj){
            if(name === "__belongTo")continue;

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.innerHTML = name+`<em>${this.__belongTo}</em>`;
            details.appendChild(summary);
            if(obj[name].constructor === Object) {
                this.parse(obj[name],details);
                this.elementObjMap.set(details,obj[name]);

            }
            if(obj[name].constructor === Array) {
                let fragment = document.createDocumentFragment();
                obj[name].map(v => v.trim()).forEach(val => {
                    let textNode = document.createTextNode(val);
                    let p = document.createElement("p");
                    p.appendChild(textNode);
                    fragment.appendChild(p);
                });

                details.appendChild(fragment);
                this.elementObjMap.set(details,obj[name].map(v => v.trim()));

            }
            container.appendChild(details);
        }
    };

};
let parseMap = new ParseMap();
parseMap.__belongTo = "";

export {parseMap};