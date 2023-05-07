#完成集合{1, 2, 3}和集合{2, 3 ,4}的并、交、差运算。
set1 = {1,2,3}
set2 = {2,3,4}
print(set1.union(set2));
print(set1.intersection(set2));
print(set1.difference(set2).union(set2.difference(set1)));
