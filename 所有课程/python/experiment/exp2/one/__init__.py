class Array:
    __elements = []

    def push(self, ele):
        self.__elements.append(ele)
        pass

    def pop(self):
        self.__elements.pop()
        pass

    def logArr(self):
        for val in self.__elements:
            print(val)
        pass

    def clear(self):
        self.__elements = []
        pass

    pass


arr = Array()
arr.push(123)
arr.push(321)
arr.push(222)
arr.push(111)
arr.logArr()
arr.pop();
arr.pop()
arr.logArr()
arr.clear()
arr.logArr()
