#include <iostream>

using namespace std;

int maze[5][5];
int n,Max;

int canplace(int row,int col)
{
    for(int i = col;i >= 0;i--)
    {
        if(maze[row][i] == 2)
        {
            return 0;
            break;
        }
        if(maze[row][i] == 1)
        {
            break;
        }
    }
    for(int i = row;i >= 0;i--)
    {
        if(maze[i][col] == 2)
        {
            return 0;
            break;
        }
        if(maze[i][col] == 1)
        {
            break;
        }
    }
    if(maze[row][col]==1)return 0;
    return 1;
}

void Search(int m)
{
    int row = m/n;
    int col = m%n;
    if(m > n*n)
    {
        int num = 0;
        for(int i = 0;i < n;i++)
        {
            for(int j = 0;j < n;j++)
            {
                if(maze[i][j]==2)num++;
            }
        }
        if(num > Max)Max = num;
    }
    else
    {
        Search(m+1);
        if(canplace(row,col))
        {
            maze[row][col] = 2;
            Search(m+1);
            maze[row][col] = 0;
        }
    }
}

int main()
{
    while(cin >> n)
    {
        if(n == 0)break;
        for(int i = 0;i < n;i++)
        {
            for(int j = 0;j < n;j++)
            {
                char x;
                cin >> x;
                if(x == 'X')maze[i][j]=1;
                else maze[i][j]=0;
            }
        }
        Max = 0;
        Search(0);
        cout << Max << endl;
    }
    return 0;
}
