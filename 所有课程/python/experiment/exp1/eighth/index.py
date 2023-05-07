#针对列表[[1, 2], [2, 6], [8, 3], [3, 3]]，分别按每个元素的第一个值、第二个值、以及两个值之和进行排序。
arr = [[1, 2], [2, 6], [8, 3], [3, 3]];
arr.sort(key=lambda x:x[0]);
print(arr);
arr.sort(key=lambda x:x[1]);
print(arr);
arr.sort(key=lambda x:sum(x));
print(arr);