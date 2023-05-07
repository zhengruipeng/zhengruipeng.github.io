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
//    printf("输入结束\n");
}
//QNode *&bestE 的原因是 首先bestE是个地址， 其次引用为了赋值使用, 后边for循环中用到
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
    QNode *E, *bestE; //bestE的作用是：结束while循环后，bestE指向最优解的叶子节点，然后通过bestE->parent找到装入了哪些物品。
    E = new QNode; //E这里作为一个中间量，连接parent和child
    E = 0;         //赋0是因为树的根的值是0，while刚开始的时候其代表root
    while(true)
    {
        int wt = Ew + w[i];
        if(wt <= c)
        {
            if(wt > bestw)   //提前更新bestW,注意更新条件
                bestw = wt;
            EnQueue(q, wt, i, E, bestE, 1);
        }
        if(Ew + r >= bestw)   //右儿子剪枝
        {
            EnQueue(q, Ew, i, E, bestE, 0);    
        }
        E = q.front();
        q.pop();
        if(!E)    //如果取得的数是0，代表该处理下一层
        {
            if(q.empty())   //如果队列为空，表示该循环结束了
                break;
            q.push(0);     //如果队列中还有数据，表示循环还没结束。在该层的末尾加一个0标识符
            E = q.front();
            q.pop();
            i++;     //下一层走起
            r -= w[i];   //计算剩余的重量
        }
        Ew = E->weight; //不要忘记更新最新节点的值
    }
    for(int j = n - 1; j > 0; --j)
    {
        bestx[j] = bestE->lchild;
        bestE = bestE->parent;
    }
}
void OutPut()
{
    printf("最优装载量为 %d\n", bestw);
    printf("装载的物品为 \n");
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

