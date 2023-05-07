//
// Created by Administrator on 9/1/2022.
//

void minest_weight_val(){
    int i,r,k,j;
    int min;
    for (i = 1; i < N; i++)    {t[i][i] = 0;    }
    for (r = 2; r < N; r++)    {
        for (i = 1; i < N-r+1; i++){
            j = i + r -1;
            min = 9999;        //假设最小值
            for (k = i; k < j; k++) {
                t[i][j] = t[i][k] + t[k+1][j] +
                          get_weight(i-1,k,j);
                if (t[i][j] < min){ //判断是否是最小值
                    min = t[i][j];
                    s[i][j] = k;
                }
            }
            t[i][j] = min;
        }
    }
}
void back_track(int a, int b){
    if(a==b) return;
    back_track(a,s[a][b]);
    back_track(s[a][b]+1,b);
    printf("最优三角形:V%d V%d V%d.\n",a-1,s[a][b],b);
}

int get_weight(int a, int b, int c){
    return weight[a][b]+weight[b][c]+weight[c][a];
}

