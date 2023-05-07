#include <stdio.h>
#include <stdlib.h>
#include "stack.h"
#include "Tree.h"
#include "List.h"



int main() {
    DoubleList list = {(void *)1,NULL,NULL};
    DoubleList *listp = &list;
    DoubleList_push(listp, (void *) 2);
    DoubleList_push(listp, (void *) 3);
    DoubleList_unshift(listp, (void *) 0);
    DoubleList_unshift(listp, (void *) -1);
    DoubleList_toString(listp);
   printf("OK");
    return 0;
}
