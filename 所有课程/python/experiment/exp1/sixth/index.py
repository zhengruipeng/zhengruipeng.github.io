def insert(arr,ele,pos = 0):
    list.insert(arr,pos,ele);
    return arr;
def delete(arr,pos=0):
    list.__delitem__(arr,pos);
    return arr;
def modify(arr,ele,pos = 0):
    arr[pos] = ele;
    return arr;
def indexOf(arr,ele):
    for i in range(list.__len__(arr)):
        if arr[i] == ele:
            return i;

arr = [1,2,3,4,5,6,7];
insert(arr,100,3);
print(arr);
delete(arr,4);
print(arr);
modify(arr,"のワの",5);
print(arr);
print(indexOf(arr,7));