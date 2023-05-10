let Tree = function (value,lChild,rChild){
    this.value = value;
    this.lChild = lChild;
    this.rChild = rChild;
};

Tree.prototype = {};
Tree.prototype.constructor = Tree;
export {Tree}