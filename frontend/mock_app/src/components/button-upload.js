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
		var url = URL.createObjectURL(file);
		var img = document.getElementById("img");
		
		var formData = new FormData();
		formData.append("file", file);
		// setSource(url);
		axios.post("http://localhost:5000/upload", formData, {
			headers: {	"Content-Type": "multipart/form-data"	}
		}).then((res) => {
			url = res.data;
		}).catch((err) => {
			console.log(err);
		});
		setTimeout(function(){
			setSource(url);
			setExt(event.target.files[0].type);
		}, 1000);
		// setExt(event.target.files[0].type);
		// setSource(url);
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
			<button className="choose_button" onClick={handleChoose}>Choose</button>
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
				{source && <Video file = {source}></Video>}
				{source &&  <button className="download_button"><a href={`http://localhost:5000/download?file=${source}`}>Download Video</a> </button> }
			</div>
			
			{/* <div className="VideoInput_footer">{source || "Nothing selected"}</div> */}
		</div >
    );
}

export default Upload;