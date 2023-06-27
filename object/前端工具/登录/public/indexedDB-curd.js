import {MyApp} from "./config.js";

let IndexedDBCurd = class extends Object{
    constructor() {
        super();
    }
    static setDatabase = function (){
        if(!IndexedDBCurd.database){
            // console.log(MyApp.database)
            IndexedDBCurd.database = MyApp.database;
        }
    }
    // static database =
    static insert(data,callback = _ => {}){
        IndexedDBCurd.setDatabase();
        // "id" in data||data.id = id;
        let IDBTransaction = IndexedDBCurd.database.transaction(MyApp.table,"readwrite");
        let IDBObjectStore = IDBTransaction.objectStore(MyApp.table);
        let req = IDBObjectStore.add(data);
        req.onsuccess = callback;
        req.onerror = callback;
    }
    static delete(id,callback = _ => {}){
        IndexedDBCurd.setDatabase();

        // "id" in data||data.id = id;
        let IDBTransaction = IndexedDBCurd.database.transaction(MyApp.table,"readwrite");
        let IDBObjectStore = IDBTransaction.objectStore(MyApp.table);
        let req = IDBObjectStore.delete(id);
        req.onsuccess = callback;
        req.onerror = callback;
    }
    static update(data,callback = _ => {}){
        IndexedDBCurd.setDatabase();

        // "id" in data||data.id = id;
        let IDBTransaction = IndexedDBCurd.database.transaction(MyApp.table,"readwrite");
        let IDBObjectStore = IDBTransaction.objectStore(MyApp.table);
        let req = IDBObjectStore.put(data);
        req.onsuccess = callback;
        req.onerror = callback;
    }
    static select(id,callback = _ => {}){
        IndexedDBCurd.setDatabase();

        // "id" in data||data.id = id;
        let IDBTransaction = IndexedDBCurd.database.transaction(MyApp.table,"readwrite");
        let IDBObjectStore = IDBTransaction.objectStore(MyApp.table);
        let req = IDBObjectStore.get(id);
        req.onsuccess = callback;
        req.onerror = callback;
    }
    static getAll(callback = _ => {}){
        IndexedDBCurd.setDatabase();

        // "id" in data||data.id = id;
        // console.log(MyApp.table);
        let IDBTransaction = IndexedDBCurd.database.transaction(MyApp.table,"readwrite");
        let IDBObjectStore = IDBTransaction.objectStore(MyApp.table);
        let openCursorIDBRequest = IDBObjectStore.openCursor();
        let res = [];
        openCursorIDBRequest.onsuccess = function () {
            let cursor = this.result;
            if (cursor) {
                res.push(cursor.value);
                cursor.continue();
            }else{
                callback.call(this,res);
                
            }
        }
    }
};
export {IndexedDBCurd};

/*
*  IndexedDBCurd.insert({id:1,val:321});
            IndexedDBCurd.select(1,function (){
                alert(this.result.val);
            });
            IndexedDBCurd.update({id:1,val:123});
            IndexedDBCurd.select(1,function (){
                alert(this.result.val);
            });
            IndexedDBCurd.getAll(function (res){
                alert();
                console.log(res);
            })
* */