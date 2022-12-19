import base64
from io import StringIO
import io
from flask import Flask, jsonify, render_template, Response, request
from tkinter import Image
import cv2
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from tkinter import *
from PIL import Image
import numpy as np
import imutils
from dehazevideo import simplest_cb
from engineio.payload import Payload
Payload.max_decode_packets = 500
app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")
CORS(app)
@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')

@app.route('/savedvideo', methods=['POST', 'GET'])
def savedvideo():
     return render_template('savedvideo.html')

def gen(filename):
    video_capture = cv2.VideoCapture(filename)
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    while True:
        ret, frame = video_capture.read()
        out = simplest_cb(frame, 1)
        gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
        humans = human_cascade.detectMultiScale(gray, 1.1, 3)

        for (x,y,w,h) in humans:
            cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)

        combined_frame = cv2.hconcat([frame, out])
        frame = cv2.imencode('.jpg', combined_frame)[1].tobytes()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/savedvideo/video_feed')
def video_feed():
    return Response(gen('busystreet3.mp4'), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/imageupload', methods=['POST'])
def imageupload():
    image = request.files.get("image")
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    if image.filename == "":
        return "No file selected"
    out = simplest_cb(image, 1)
    gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
    humans = human_cascade.detectMultiScale(gray, 1.1, 3)

    for (x,y,w,h) in humans:
        cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)
    imgencode = cv2.imencode('.jpg', out)[1]
    image_data = base64.b64encode(imgencode).decode("utf-8")
    b64_src = 'data:image/jpg;base64,'
    image_data = b64_src + image_data
    return jsonify({"image_data": image_data})

@app.route('/dehaze', methods=['POST', 'GET'])
def dehaze():
    return render_template('uploadvideo.html')

@app.route('/dehaze/upload_video',methods=['POST', 'GET'])
def upload_video():
    video = request.files.get("video")
    if video.filename == "":
        return "No file selected"
    video.save(video.filename)
    return Response(gen(video.filename), mimetype='multipart/x-mixed-replace; boundary=frame')

@socketio.on('image')
def image(data_image):
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    sbuf = StringIO()
    sbuf.write(data_image)
    b = io.BytesIO(base64.b64decode(data_image))
    pimg = Image.open(b)
    frame=np.array(pimg)
    frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)
    frame = imutils.resize(frame, width=500, height=375)
 
    out = simplest_cb(frame, 1)
    gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
    humans = human_cascade.detectMultiScale(gray, 1.1, 3)

    for (x,y,w,h) in humans:
        cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)
    imgencode = cv2.imencode('.jpg', out)[1]
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData
    emit('response_back', stringData)

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1')

