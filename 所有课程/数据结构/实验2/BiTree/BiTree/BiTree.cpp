// BiTree.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>

#include "stdio.h"#include "stdlib.h"  typedef char TElemType;  typedef struct BiTNode  {	  TElemType data;	  struct BiTNode *lchild, *rchild;  }BiTNode, *BiTree;  void CreateBiTree(BiTree &T)  {	  TElemType ch;	  scanf("%c", &ch);	  if (ch == ' ')		  T = NULL;	  else	  {		  T = (BiTree)malloc(sizeof(BiTNode));		  if (!T)			  exit(-1);		  T->data = ch;		  CreateBiTree(T->lchild);		  CreateBiTree(T->rchild);	  }  }  void DestoryBiTree(BiTree &T)  {	  if (T)	  {		  if (T->lchild)			  DestoryBiTree(T->lchild);		  if (T->rchild)			  DestoryBiTree(T->rchild);		  free(T);		  T - NULL;	  }  }  void PreOrderTraverse(BiTree T)  {	  if (T)	  {		  printf("%c", T->data);		  PreOrderTraverse(T->lchild);		  PreOrderTraverse(T->rchild);	  }  }  void InOrderTraverse(BiTree T)  {	  if (T)	  {		  InOrderTraverse(T->lchild);		  printf("%c", T->data);		  InOrderTraverse(T->rchild);	  }  }  void PostOrderTraverse(BiTree T)  {	  if (T)	  {		  PostOrderTraverse(T->lchild);		  PostOrderTraverse(T->rchild);		  printf("%c", T->data);	  }  }  int Depth(BiTree T)
  {
	  int m, n;
	  int deep = 0;
	  if (T != NULL)
	  {
		  m = Depth(T->lchild);
		  n = Depth(T->rchild);
		  deep = m >= n ? m + 1 : n + 1;

	  }
	  else
	  {
		  return deep;
	  }
  }  int main()  {	  BiTree T;	  printf("请输入建立二叉树的字符序列（包括空格）:\n");	  CreateBiTree(T);	  printf("\n先序递归遍历二叉树:\n");	  PreOrderTraverse(T);	  printf("\n中序递归遍历二叉树:\n");	  InOrderTraverse(T);	  printf("\n后序递归遍历二叉树:\n");	  PostOrderTraverse(T);	  int a = Depth(T);
	  printf("\n二叉树的深度为:%d\n",a);	  printf("\n");	  DestoryBiTree(T);	  return 0;  }

// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门使用技巧: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件
