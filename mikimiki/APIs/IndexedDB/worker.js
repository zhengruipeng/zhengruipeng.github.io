(function (){
    const IDBOpenDBReq = indexedDB.open("testDB",4);
    IDBOpenDBReq.onsuccess = function (){
        console.log(IDBOpenDBReq)

        let db = this.result;
        console.log(db)
        console.log(db.transaction(["foo"],'readwrite'))
        // db.createObjectStore("testOBJ1", { keyPath: "username" });

        /*let indexDBTransaction = db.transaction("obj1","readwrite");
        indexDBTransaction.createObjectStore("testOBJ1",{a:1,b:2})
        let indexedDBObjS = indexDBTransaction.objectStore("testOBJ1");
        console.log(indexedDBObjS)*/
    }

})()