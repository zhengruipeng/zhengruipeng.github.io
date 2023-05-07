import requests
sess = requests.Session()
url = r"https://zhengruipeng.github.io/doorplate/index.html"
resp = sess.get(url)
print("resp.ok: ", resp.ok)
print("网页源代码：\n", resp.content.decode("utf-8"))
