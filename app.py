import base64
from io import StringIO
import io
from flask import Flask, render_template, Response,jsonify
from tkinter import Image
import cv2
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from tkinter import *
from PIL import Image
from werkzeug.utils import secure_filename
import numpy as np
import imutils
from dehazevideo import simplest_cb
from engineio.payload import Payload
from flask import request, send_file
from time import sleep

Payload.max_decode_packets = 500
app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")
CORS(app)

file = None
flag = False
@app.route('/upload', methods = ['POST','GET'])
def upload_file():
    global file
    global flag
    file = request.files['file']
    file.save(secure_filename(file.filename))
    flag = not flag
    # return Response(gen(file.filename), mimetype='multipart/x-mixed-replace; boundary=frame')
    print(file.filename)
    # video_feed()
    return "done"

@socketio.on('connect')
def on_connect():
    print('Client connected')


@app.route('/download', methods = ['GET'])
def download_file():
    video_capture = cv2.VideoCapture(secure_filename(file.filename))
    print(secure_filename(file.filename))
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    save = cv2.VideoWriter('output.avi',fourcc, 20.0, (int(video_capture.get(3)),int(video_capture.get(4))))
    while(video_capture.isOpened()):
        try:
            ret, frame = video_capture.read()
            if(ret==False):
                break
            out = simplest_cb(frame, 1)
            save.write(out)
            key=cv2.waitKey(1)
            if key==27:
                break
        except:
            break
    video_capture.release()
    save.release()
    cv2.destroyAllWindows()
    sleep(1)
    return send_file('output.avi', as_attachment=True)

@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')

@app.route('/savedvideo', methods=['POST', 'GET'])
def savedvideo():
     return render_template('savedvideo.html')

def gen():
    video_capture = cv2.VideoCapture(secure_filename(file.filename))
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    print(secure_filename(file.filename))
    flag2 = flag
    while True:
        if(flag2!=flag):
            return
        try:
            ret, frame = video_capture.read()
            out = simplest_cb(frame, 1)
            gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
            humans = human_cascade.detectMultiScale(gray, 1.1, 3)
            for (x,y,w,h) in humans:
                cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)
            combined_frame = cv2.vconcat([frame, out])
            frame = cv2.imencode('.jpg', combined_frame)[1].tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except:
            return

@app.route('/savedvideo/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

def genremote(url):
    print(url)
    video_capture = cv2.VideoCapture(url)
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    while True:
        try:
            ret, frame = video_capture.read()
            out = simplest_cb(frame, 1)
            gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
            humans = human_cascade.detectMultiScale(gray, 1.1, 3)
            for (x,y,w,h) in humans:
                cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)
            combined_frame = cv2.vconcat([frame, out])
            frame = cv2.imencode('.jpg', combined_frame)[1].tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except:
            return
url=""
@app.route('/remote', methods=['POST'])
def video_feedremote():
    global url
    url=request.form.get('url')
    return "done"


@app.route('/showremote', methods=['GET'])
def videofeedremote():
    return Response(genremote(url), mimetype='multipart/x-mixed-replace; boundary=frame')



def gendevice():
    video_capture = cv2.VideoCapture(0)
    human_cascade= cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_fullbody.xml')
    while True:
        
        try:
            ret, frame = video_capture.read()
            out = simplest_cb(frame, 1)
            gray=cv2.cvtColor(out, cv2.COLOR_BGR2GRAY)
            humans = human_cascade.detectMultiScale(gray, 1.1, 3)
            for (x,y,w,h) in humans:
                cv2.rectangle(out,(x,y),(x+w,y+h),(255,0,0),2)
            combined_frame = cv2.vconcat([frame, out])
            frame = cv2.imencode('.jpg', combined_frame)[1].tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except:
            return

@app.route('/showvideodevice', methods=['GET'])
def videofeeddevice():
    return Response(gendevice(), mimetype='multipart/x-mixed-replace; boundary=frame')


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
    output = simplest_cb(frame, 1)
    gray=cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)
    humans = human_cascade.detectMultiScale(gray, 1.1, 3)
    for (x,y,w,h) in humans:
        cv2.rectangle(output,(x,y),(x+w,y+h),(255,0,0),2)
    imgencode = cv2.imencode('.jpg', output)[1]
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData
    emit('response_back', stringData,room=request.sid)

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1',debug=True)

