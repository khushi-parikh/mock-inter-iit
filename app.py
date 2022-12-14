import base64
from io import StringIO
import io
from flask import Flask, render_template, Response
from tkinter import Image
import cv2
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask import Flask
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
     
def gen():
    # Capture video from laptop camera replace 0 with video file name

    video_capture = cv2.VideoCapture('testhaze.mp4')
    while True:
        # Read a frame from the camera
        ret, frame = video_capture.read()
        out = simplest_cb(frame, 1)


        # Apply the Gaussian blur filter to the frame
        # blurred_frame = cv2.GaussianBlur(frame, (5, 5), 0)
        # Concatenate the original and processed frames side by side
        combined_frame = cv2.hconcat([frame, out])
        # Encode the combined frame in JPEG format
        frame = cv2.imencode('.jpg', combined_frame)[1].tobytes()
        # Yield the frame to the generator
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        
@app.route('/savedvideo/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

@socketio.on('image')
def image(data_image):
    sbuf = StringIO()
    sbuf.write(data_image)
    b = io.BytesIO(base64.b64decode(data_image))
    pimg = Image.open(b)
    frame=np.array(pimg)
    frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)
    print(frame.shape)
    frame = imutils.resize(frame, width=500, height=375)
    output = simplest_cb(frame, 1)
    frame = cv2.flip(output, 1)
    imgencode = cv2.imencode('.jpg', frame)[1]
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData
    emit('response_back', stringData)

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1')

