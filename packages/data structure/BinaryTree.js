let BinaryTree = function (value,lChild = null,rChild = null){
    this.value = value;
    this.lChild = lChild;
    this.rChild = rChild;
};

BinaryTree.prototype = {
    value :null,
    lChild :null,
    rChild :null,
};
BinaryTree.prototype.constructor = BinaryTree;
export {BinaryTree}