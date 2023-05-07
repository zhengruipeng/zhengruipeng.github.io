import cv2
cap = cv2.VideoCapture("1.mp4")
ret, frame = cap.read()    # 反复执行则顺序读每一帧的数据
print(frame)    # 一个帧的数据
