import math
def foo(n):
    res = 0;
    for k in range(n):
        res += 1/(16**k)*(4/(8*k+1) - 2/(8*k+4) - 1/(8*k+5) - 1/(8*k+6));
    return res;

print(foo(5))