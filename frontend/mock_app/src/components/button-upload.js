import { useState, useRef } from "react";
import React from "react";
import '../styles/button-upload.css'
import axios from "axios";
import Video from "./video";

function Upload(){
	const inputRef = useRef();

	const [source, setSource] = useState();
	const [ext,setExt] = useState();

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		var img = document.getElementById("img");
		// img.innerHTML = "";
		setExt(event.target.files[0].type);
		var formData = new FormData();
		formData.append("file", file);
		setSource(url);
		// console.log(FormData);
		axios.post("http://localhost:5000/upload", formData, {
			headers: {	"Content-Type": "multipart/form-data"	}
		}).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
		setSource(url);
		// document.location.reload();
		// img.innerHTML = "<img src = 'http://localhost:5000/savedvideo/video_feed' alt = '' class='VideoInput_image'  />";
		// console.log(event.target.files[0]);
		// console.log(URL.createObjectURL(event.target.files[0]));
	};

	const handleChoose = (event) => {
		inputRef.current.click();
	};

	return(
    	<div className = "VideoInput" >
			<input
				ref={inputRef}
				className="VideoInput_input"
				type="file"
				onChange={handleFileChange}
				accept=".mov,.mp4,.jpg,.png"
			/>
			<button onClick={handleChoose}>Choose</button>
			{/* {
				source && (ext=="video/mp4" || ext=="video/quicktime") && (
					<video
						className="VideoInput_video"
						// width="50%"
						// height="50%"
						controls
						src={source}
					/>
				)
			}
			{
				source && (ext=="image/jpeg" || ext=="image/png") && (
					<img
						className="VideoInput_image"
						// width="100%"
						// height="100%"
						controls
						src={source}
					/>
				)
			} */}
			<div id="img">
				{source && <Video></Video>}
			</div>
			
			{/* <div className="VideoInput_footer">{source || "Nothing selected"}</div> */}
		</div >
    );
}

export default Upload;