let List = function (){
    this.list = null;
    let selectDefault = function (){
        this.classList.toggle("selected");
        this.selected = !this.selected;
    }
    this.initList = function (id/*String*/){
        const ul = document.createElement("ul");
        ul.id = id;
        this.list = ul;
        return ul;
    };

    this.createItem = function (content/*String(parse to html)*/){
        const li = document.createElement("li");
        li.innerHTML = content;
        li.onclick = selectDefault;
        li.selected = false;
        this.list.appendChild(li);
        return li;
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

    this.getSelectedItems = function (){
        let res = [];
        Array.from(this.list.children).forEach(item => {
            item.selected && res.push(item);
        });
        return res;

    };
};
List.prototype = {};
List.prototype.constructor = List;

export {List};
