#include <stdio.h>
#include <malloc.h>
typedef struct LNode{
	int data;
	struct LNode *next;
}LNode,*LinkList;
int GetElem(LinkList L,int i,int &e){		//&e�����Ͳ�����������й����и�e��ֵ��ϣ���õ��޸�֮��Ľ�� 
	LinkList p;
	p = L -> next;
	while(p != NULL){
		printf("%d\n",p->data);
		p = p -> next;
	}	
} 
int main(){
	
} 	
