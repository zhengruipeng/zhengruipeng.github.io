#include <stdio.h>
#include <stdlib.h>
typedef struct LNode {
	int data[5];
	int len;
}LNode, *List;
void initList(List &l) {
	l = (List)malloc(sizeof(LNode));
	l->len = 0;
}
void traverse(List l) {
	int i;
	for (i = 0; i < l->len; i++) {
		printf("%5d", l->data[i]);
	}
}
void fillList(List &l, int n) {
	int i;
	for (i = 0; i < n; i++) {
		scanf_s("%d", &l->data[i]);
		l->len++;
	}
}
void insertItem(List &l, int index, int e) {
	int i;
	for (i = l->len - 1; i >= index; i--) {
		l->data[i + 1] = l->data[i];
	}
	l->data[index] = e;
	l->len++;
}
void deleteItem(List &l, int index, int &e) {
	int i;
	e = l->data[index];
	for (i = index; i < l->len-1; i++) {
		l->data[i] = l->data[i+1];
	}
	l->len--;
}
void clearList(List &l) {
	int i;
	for (i = 0; i < l->len; i++) {
		l->data[i] = NULL;
	}
	l->len = 0;
	free(l);
}
int getItem(List l, int index) {
	return l->data[index];
}
int setItem(List l, int index,int e) {
	l->data[index] = e;
	return e;
}
int main() {
	List l = NULL;
	initList(l);
	fillList(l, 4);
	traverse(l);
	insertItem(l, 1, 23);
	traverse(l);
	printf("\n");
	int delE;
	deleteItem(l, 2, delE);
	printf("%d", delE);
	traverse(l);
	printf("\n");
	setItem(l, 3, 99);
	printf("%d", getItem(l, 3));
	printf("\n");

	traverse(l);

	clearList(l);
}