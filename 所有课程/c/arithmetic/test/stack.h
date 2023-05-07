//
// Created by Administrator on 2022/04/25.
//

#ifndef TEST_STACK_H
typedef struct Stack{
    char data;
    struct Stack *next;
//    struct Stack *first;
}Stack,*Stackp;

Stack* Stack_push(Stack* stack,char data){
    Stack *o = (Stack*)malloc(sizeof(Stackp));
    o -> data = data;
    o -> next = stack;
    return o;
}

Stack* Stack_pop(Stack* stack){
    if(stack == NULL)return '\0';
    Stack* local = stack;
    stack = stack -> next;
    free(local);
    return stack;
}

char getFirst(Stack* stack){
    return stack -> data;
}


#define TEST_STACK_H

#endif //TEST_STACK_H

/*
 *
 *  Stack *sta = NULL;
    sta = push(sta,'1');
    sta = push(sta,'2');
    sta = push(sta,'3');

    printf("%c\n", sta -> data);
    sta = pop(sta);
    printf("%c\n", getFirst(sta));

    sta = pop(sta);
    printf("%c\n", getFirst(sta));

    sta = pop(sta);
//    printf("%c\n", getFirst(sta));

    sta = push(sta,'4');
    printf("%c\n", getFirst(sta));

    sta = push(sta,'5');
    printf("%c\n", getFirst(sta));

    sta = pop(sta);
    printf("%c\n", getFirst(sta));

    printf("OK");*/
