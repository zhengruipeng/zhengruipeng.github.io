#include <stdio.h>
#include <stdlib.h>
#define MAX 9
//单个记录的结构体
typedef struct {
	int key;
}SqNote;
//记录表的结构体
typedef struct {
	SqNote r[MAX];
	int length;
}SqList;
//此方法中，存储记录的数组中，下标为 0 的位置时空着的，不放任何记录，记录从下标为 1 处开始依次存放
int Partition(SqList *L, int low, int high) {
	L->r[0] = L->r[low];
	int pivotKey = L->r[0].key;
	while (low < high) {
		while (low < high && L->r[high].key >= pivotKey) {
			high--;
		}
		L->r[low] = L->r[high];
		while (low < high && L->r[low].key <= pivotKey) {
			low++;
		}
		L->r[high] = L->r[low];
	}
	L->r[low].key = pivotKey;
	return low;
}
void QSort(SqList *L, int low, int high) {
	if (low < high) {
		int spliter = Partition(L, low, high);
		QSort(L, low, spliter - 1);
		QSort(L, spliter + 1, high);
	}
}
void QuickSort(SqList *L) {
	QSort(L, 1, L->length);
}
void swap(int *a, int *b) {
	int *t = a;
	t = a;
	a = b;
	b = t;
}
void bubbleSort(SqList *l) {
	for (int i = 1; i <= l->length; i++) {
		for (int j = 1; j <= l->length - i; j++) {

			if (l->r[j].key > l->r[j+1].key) {
				//swap(&(l->r[j].key), &(l->r[j + 1].key));
				int t = l->r[j].key;
				l->r[j].key = l->r[j + 1].key;
				l->r[j + 1].key = t;

			}
		}
	}
}
int main() {
	SqList * L = (SqList*)malloc(sizeof(SqList));
	L->length = 8;
	L->r[1].key = 49;
	L->r[2].key = 38;
	L->r[3].key = 65;
	L->r[4].key = 97;
	L->r[5].key = 76;
	L->r[6].key = 13;
	L->r[7].key = 27;
	L->r[8].key = 49;
	bubbleSort(L);
	for (int i = 1; i <= L->length; i++) {
		printf("%d ", L->r[i].key);
	}
	return 0;
}