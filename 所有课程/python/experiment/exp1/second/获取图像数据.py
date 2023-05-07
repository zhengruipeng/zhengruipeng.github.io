from PIL import Image

im = Image.open("test.png")
print("im.mode: ", im.mode)
print("im.size: ", im.size)
im.show()
