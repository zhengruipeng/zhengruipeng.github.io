class ContextMenu extends Object{
    menu;
    items = [];
    constructor(container) {
        super();
        const menu = document.createElement("div");
        menu.className = "menu";
        this.menu = menu;
        if(!container)container = document.body;
        container.appendChild(menu);
        container.addEventListener("contextmenu",function (ev){
            ev.preventDefault();
            menu.style.left = ev.x + "px";
            menu.style.top = ev.y + "px";
            menu.style.display = "block";

        })
        container.addEventListener("click",function (){
            menu.style.display = "none";
        })
    }
    createItem(text,cb){
        const item = document.createElement("div");
        item.innerText = text;

        const that = this;
        item.addEventListener("click",cb);
        item.addEventListener("click",function (){
            that.menu.style.display = "block";

        });
        this.menu.appendChild(item);
        this.items.push(item);
    }
    removeItem(index){
        let item = this.items[index];
        if(!item)return false;

        this.menu.removeChild(item);

    }


}
let contextMenu = new ContextMenu();
export {contextMenu}