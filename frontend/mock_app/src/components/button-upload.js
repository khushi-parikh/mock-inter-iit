import { useState, useRef } from "react";
import React from "react";
import '../styles/button-upload.css'

function Upload(){
	const inputRef = useRef();

	const [source, setSource] = useState();
	const [ext,setExt] = useState();

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		setSource(url);
		setExt(event.target.files[0].type);
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
			{
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
			}
			{/* <div className="VideoInput_footer">{source || "Nothing selected"}</div> */}
		</div >
    );
}

export default Upload;