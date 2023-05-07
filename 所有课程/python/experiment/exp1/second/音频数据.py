import wave
with wave.open("1.mp4", "rb") as wf:
    frames = wf.readframes(wf.getnframes())
    print(frames)    # 音频数据
