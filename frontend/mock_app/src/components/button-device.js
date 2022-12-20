import React from "react";
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
    <div>
      {link === " " && (
        <button type="submit" onClick={handlesubmit}>
          Start
        </button>
      )}
      <div
        style={{
          margin: "1.5rem",
        }}
      >
        <img alt="" style={{ width: "30%" }} src={link}></img>
      </div>
      {link !== " " && (
        <button type="submit" onClick={handlend}>
          end
        </button>
      )}
    </div>
  );
};

export default Device;
