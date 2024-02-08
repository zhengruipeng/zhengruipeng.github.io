let ParseMap = class extends Object {
    __belongTo;
    elementObjMap = new Map();

    parse(obj, container, stage = 0) {
        if (obj.__belongTo) this.__belongTo = obj.__belongTo;
        if (stage > 3) return null;
        for (let name in obj) {
            if (name === "__belongTo") continue;

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.innerHTML = name + `<em>${this.__belongTo}</em>`;
            details.appendChild(summary);
            if (obj[name]?.constructor === Object) {
                this.parse(obj[name], details, stage + 1);
                this.elementObjMap.set(details, obj[name]);

            }
            if (obj[name]?.constructor === Array) {
                let fragment = document.createDocumentFragment();
                obj[name].map(v => v.trim()).forEach(val => {
                    let textNode = document.createTextNode(val);
                    let p = document.createElement("p");
                    p.appendChild(textNode);
                    fragment.appendChild(p);
                });

                details.appendChild(fragment);
                this.elementObjMap.set(details, obj[name].map(v => v.trim()));

            }
            if (typeof obj[name] === "function") {
                let text = obj[name]();
                let fragment = document.createDocumentFragment();
                text.split("\n").map(v => v.trim()).forEach(val => {
                    let textNode = document.createTextNode(val);
                    let p = document.createElement("p");
                    p.appendChild(textNode);
                    fragment.appendChild(p);
                });

                details.appendChild(fragment);
                this.elementObjMap.set(details, text.split("\n").map(v => v.trim()));

            }
            if (obj[name] === null) {

                let textNode = document.createTextNode(name);
                let p = document.createElement("p");
                p.appendChild(textNode);

                details.appendChild(p);
                this.elementObjMap.set(details, name);

            }
            container.appendChild(details);
        }
    }
};

let parseMap = new ParseMap();
parseMap.__belongTo = "";

export {parseMap};