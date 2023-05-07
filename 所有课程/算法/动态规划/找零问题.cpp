#include <stdio.h> 
#include <stdlib.h> 

//动态规划之找零问题
void MakeMoney(int *money, int len, int total)
{
    int *coinMoney = new int[total + 1];   //下标为0的位置不用
    coinMoney[0] = 0;
    int i = 1;
    //i-->钱币面值，money[i]表示找零的最小硬币数
    for (; i <= total; i++)    //i控制1~total之间的每种币值都找零钱，也就是若干子问题
    {
        int minMoney = i;
        for (int j = 0; j < len; j++)   //j是控制每种钱币面值是否在找零钱的范围内
        {
            if (i >= money[j])   //要找的零钱i大于硬币的面值
            {
                int tmp = coinMoney[i - money[j]] + 1;
                if (tmp < minMoney)   //更新所需要的最少的硬币数
                {
                    minMoney = tmp;
                }
            }
        }
        coinMoney[i] = minMoney;
    }
    printf("找零为%d需要的最小硬币数为%d\n", total, coinMoney[i-1]);
    delete[]coinMoney;
}

int main()
{
    int money[] = { 1, 2, 5, 21, 25 };
    int len = sizeof(money) / sizeof(money[0]);
    int total = 85;
    MakeMoney(money, len, total);
    system("pause");
    return 0;
}
