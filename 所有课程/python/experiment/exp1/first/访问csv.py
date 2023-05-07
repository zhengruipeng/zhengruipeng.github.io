with open("csv文本案例.csv", "rt", encoding="utf-8") as fp:
    s = fp.read()
print(s)
for s1 in  s.split(sep=","):
    print(s1)

