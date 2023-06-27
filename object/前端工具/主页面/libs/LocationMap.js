/**
 * 用于以面向对象的方式操作地址栏Location的search部分
 */
let LocationMap = class extends Object {
    location/*Location*/ = null;

    getSearchMap() {
        let res = {};
        let entries = this.location.search.substring(1).split("&");
        entries.forEach(str => {
            let [key, value] = str.split("=");
            if(key.trim() === "" || value.trim() === "")return false;
            
            res[key] = value;
        });
        return res;
    }
    setSearchMap(map/*Object*/) {
        this.location.search = this.getSearchStr(map);
    }

    getSearchStr(map/*Object*/) {
        let str = "?";
        for (let key in map) {
            str += key + "=" + map[key] + "&";
        }
        str = str.substring(0, str.length - 1);
        return str;
    }



    constructor(location/*Location*/) {
        super();
        this.location = location;
    }
};
        
export {LocationMap};