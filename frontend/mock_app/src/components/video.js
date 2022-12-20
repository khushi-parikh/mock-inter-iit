import '../styles/navbar.css';
import React from "react";
import { useState } from "react";

function Video(){
	// const [source, setSource] = useState();
	// const [hash, setHash] = useState();
	// setSource("http://localhost:5000/savedvideo/video_feed");
	// setHash(Date.now());
	var source = "http://localhost:5000/savedvideo/video_feed";
	var hash = Date.now();
	return (
		<div>
            <img key={Date.now()}  className="VideoInput_image" src={`${source}?${hash}`} alt=""/>
		</div>
		
	);
}

export default Video;