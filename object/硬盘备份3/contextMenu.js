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
            menu.ontransitionend = null;
            menu.style.left = ev.x + "px";
            menu.style.top = ev.y + "px";
            menu.style.display = "block";
            menu.style.opacity = "1";
            menu.style.zIndex = "1";
        })
        container.addEventListener("click",function (){
            menu.style.opacity = "0";
            menu.style.zIndex = "-1";
            menu.ontransitionend = function (){
                this.style.display = "none";
            }
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