#include <bits/stdc++.h>
using namespace std;
typedef struct QNode
{
    QNode *parent;
    int lchild;
    int weight;
}QNode;
int n;
int c;
int bestw;
int w[100];
int bestx[100];
void InPut()
{
    scanf("%d %d", &n, &c);
    for(int i = 1; i <= n; ++i)
        scanf("%d", &w[i]);
//    for(int i = 1; i <= n; ++i)
//        printf("%d ", w[i]);
//    cout << endl;
//    printf("�������\n");
}
//QNode *&bestE ��ԭ���� ����bestE�Ǹ���ַ�� �������Ϊ�˸�ֵʹ��, ���forѭ�����õ�
void EnQueue(queue<QNode *> &q, int wt, int i, QNode *E, QNode *&bestE, int ch)
{
    if(i == n)
    {
        if(wt == bestw)
        {
            bestE = E;
            bestx[n] = ch;
            return;
        }
    }
    QNode *b;
    b = new QNode;
    b->weight = wt;
    b->lchild = ch;
    b->parent = E;
    q.push(b);
}
int MaxLoading()
{
    queue<QNode *>q;
    q.push(0);
    int i = 1;
    int Ew = 0, r = 0;
    bestw = 0;
    for(int j = 2; j <= n; ++j)
        r += w[j];
    QNode *E, *bestE; //bestE�������ǣ�����whileѭ����bestEָ�����Ž��Ҷ�ӽڵ㣬Ȼ��ͨ��bestE->parent�ҵ�װ������Щ��Ʒ��
    E = new QNode; //E������Ϊһ���м���������parent��child
    E = 0;         //��0����Ϊ���ĸ���ֵ��0��while�տ�ʼ��ʱ�������root
    while(true)
    {
        int wt = Ew + w[i];
        if(wt <= c)
        {
            if(wt > bestw)   //��ǰ����bestW,ע���������
                bestw = wt;
            EnQueue(q, wt, i, E, bestE, 1);
        }
        if(Ew + r >= bestw)   //�Ҷ��Ӽ�֦
        {
            EnQueue(q, Ew, i, E, bestE, 0);    
        }
        E = q.front();
        q.pop();
        if(!E)    //���ȡ�õ�����0������ô�����һ��
        {
            if(q.empty())   //�������Ϊ�գ���ʾ��ѭ��������
                break;
            q.push(0);     //��������л������ݣ���ʾѭ����û�������ڸò��ĩβ��һ��0��ʶ��
            E = q.front();
            q.pop();
            i++;     //��һ������
            r -= w[i];   //����ʣ�������
        }
        Ew = E->weight; //��Ҫ���Ǹ������½ڵ��ֵ
    }
    for(int j = n - 1; j > 0; --j)
    {
        bestx[j] = bestE->lchild;
        bestE = bestE->parent;
    }
}
void OutPut()
{
    printf("����װ����Ϊ %d\n", bestw);
    printf("װ�ص���ƷΪ \n");
    for(int i = 1; i <= n; ++i)
        if(bestx[i] == 1)
          printf("%d ", i);
}
int main()
{
    InPut();
    MaxLoading();
    OutPut();
}

