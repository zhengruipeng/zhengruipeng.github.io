let List = function (){
    this.list = null;
    this.initList = function (id/*String*/){
        const ul = document.createElement("ul");
        ul.id = id;
        this.list = ul;
        return ul;
    };
    this.createItem = function (content/*String(parse to html)*/){
        const li = document.createElement("li");
        li.innerHTML = content;
        this.list.appendChild(li);
        return this.list;
    };
    this.removeItem = function (index/*int*/){
        let child = null
        try{
            child  = this.list.children[index];
            this.list.removeChild(child);
        }catch (e){
            console.log("u are trying to remove an unexist element");
        }
        return child;
    };
};
List.prototype = {};
List.prototype.constructor = List;

export {List};
