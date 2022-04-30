__ATPRERUN__.push(_ => {
    console.log("atprerun");
});
__ATPOSTRUN__.push(_ => {
    console.log("atpostrun");
    Module.setStatus = function (status){
        console.log(`status:${status}`);
    };
});
__ATINIT__.push( _ => {
    console.log("atinit");
});
__ATMAIN__.push(_ => {
    console.log("atmain");
});
__ATEXIT__.push(_ => {
    console.log("atexit");
})