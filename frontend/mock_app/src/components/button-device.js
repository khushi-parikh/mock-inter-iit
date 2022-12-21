 import React from "react";
 import "../styles/button-device.css"
 import { useState } from "react";
 const Device = () => {
   const [link, setlink] = useState(" ");
   function handlesubmit(event) {
     setlink("http://localhost:5000/showvideodevice");
   }
   function handlend(event) {
     setlink(" ");
   }
   return (
     <div className="VideoInput">
       {link === " " && 
         <button className="device_button" type="submit" onClick={handlesubmit}>
           Start
         </button>
       }
       <img className="VideoInput_img" alt="" style={{ width: "50%" }} src={link}></img>
       {link !== " " && (
         <button className="device_button" type="submit" onClick={handlend}>
           End
         </button>
       )}
     </div>
   );
  };

export default Device;

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// const Device = () => {

//   const socket = io("http://localhost:5000");

//   socket.on("connect", function () {
//     console.log("Connected...!", socket.connected);
//   });

//   const [stream, setStream] = useState(null);
//   const [error, setError] = useState(null);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (isStreaming && videoRef.current) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [isStreaming, stream]);

//   useEffect(() => {
//     if (isStreaming && videoRef.current) {
//       const video = document.getElementById("video");
//       video.width = 400;
//       video.height = 200;
//       var canvas = document.getElementById("canvasOutput");
//       var context = canvas.getContext("2d");
//       const image_id = document.getElementById("image");
//       canvas.width = video.width;
//       canvas.height = video.height;

//       if (navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices
//           .getUserMedia({ video: true })
//           .then(function (stream) {
//             video.srcObject = stream;
//             video.play();
//           })
//           .catch(function (err0r) {
//             console.log(err0r);
//             console.log("Something went wrong!");
//           });
//       }

//       const FPS = 22;
//       var width = video.width;
//       var height = video.height;

//       setInterval(() => {
//         var type = "image/png";
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         var data = canvas.toDataURL(type);
//         context.clearRect(0, 0, width, height);

//         data = data.replace("data:" + type + ";base64,", "");

//         socket.emit("image", data);
//       }, 1000 / FPS);

//       socket.on("response_back", function (image) {
//         image_id.src = image;
//       });
//     }
//   }, [isStreaming, stream]);

//   const startStream = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });
//       setStream(mediaStream);
//       setIsStreaming(true);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const stopStream = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setIsStreaming(false);
//   };

//   return (
//     <div>
//       <canvas id="canvasOutput"></canvas>
//       {error && <p>Error: {error.message}</p>}
//       {isStreaming && (
//         <video ref={videoRef} id="video" autoPlay />
//       )}
//       {!isStreaming && <button onClick={startStream}>Start</button>}
//       {isStreaming && <button onClick={stopStream}>Stop</button>}
//       {isStreaming && (
//         <img id="image" />
//       )}
//     </div>
//   );
// };

// export default Device;