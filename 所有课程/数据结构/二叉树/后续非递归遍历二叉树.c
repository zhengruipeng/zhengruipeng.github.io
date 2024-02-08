//
// Created by Miki on 5/26/2023.
//

void foo(BTree tree){
    Stack s = stack_init();
    BTree lastVisited = NULL;
    BTree r = tree;
    while(r || !stack_isEmpty(s)){
        if(r != NULL){
            stack_pust(r);

            r = r -> lChild;

            return ;
        }else{
            BTree lastNode = stack_getTop(s);
            if(lastNode -> rChild != NULL && lastVisited != lastNode -> rChild){
                r = lastNode -> rChild;
                stack_pust(r);
                return ;
            }else{
                lastNode = stack_pop(s);
                visit(lastNode);
                r = NULL;
                lastVisited = lastNode;
            }
        }
    }

}
