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
