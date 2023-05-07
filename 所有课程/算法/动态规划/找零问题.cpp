#include <stdio.h> 
#include <stdlib.h> 

//��̬�滮֮��������
void MakeMoney(int *money, int len, int total)
{
    int *coinMoney = new int[total + 1];   //�±�Ϊ0��λ�ò���
    coinMoney[0] = 0;
    int i = 1;
    //i-->Ǯ����ֵ��money[i]��ʾ�������СӲ����
    for (; i <= total; i++)    //i����1~total֮���ÿ�ֱ�ֵ������Ǯ��Ҳ��������������
    {
        int minMoney = i;
        for (int j = 0; j < len; j++)   //j�ǿ���ÿ��Ǯ����ֵ�Ƿ�������Ǯ�ķ�Χ��
        {
            if (i >= money[j])   //Ҫ�ҵ���Ǯi����Ӳ�ҵ���ֵ
            {
                int tmp = coinMoney[i - money[j]] + 1;
                if (tmp < minMoney)   //��������Ҫ�����ٵ�Ӳ����
                {
                    minMoney = tmp;
                }
            }
        }
        coinMoney[i] = minMoney;
    }
    printf("����Ϊ%d��Ҫ����СӲ����Ϊ%d\n", total, coinMoney[i-1]);
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
