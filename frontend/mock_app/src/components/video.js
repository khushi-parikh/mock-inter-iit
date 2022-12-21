import '../styles/navbar.css';
import React from "react";
import { useState } from "react";

function Video(props){
	// const [source, setSource] = useState();
	// const [hash, setHash] = useState();
	// setSource("http://localhost:5000/savedvideo/video_feed");
	// setHash(Date.now());
	var source = "http://localhost:5000/savedvideo/video_feed";
	var hash = props.file;
	var hash2 = Date.now();
	return (
		<div>
            <img key={Date.now()}  className="VideoInput_image" src={`${source}?file=${hash}&${hash2}`} alt=""/>
		</div>
		
	);
}

export default Video;