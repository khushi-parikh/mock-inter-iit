import React from "react";
import { useState } from "react";
import axios from "axios";
const Remote = () => {
  const [state, setstate] = useState({
    originalfeed: "",
    fianlfeed: "",
    url: "",
  });

  function updateurl(event) {
    setstate({
      ...state,
      url: event.target.value,
    });
  }
  function handlesubmit(event) {
    const url = state.url;
    var formData = new FormData();
    formData.append("url", url);
    setstate({
      url: "",
    });
    axios
      .post("http://localhost:5000/remote", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        setstate({
          fianlfeed: "http://localhost:5000/showremote",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div
        style={{
          margin: "2rem",
        }}
      >
        <input
          style={{
            margin: "0.5rem",
          }}
          type="url"
          onChange={updateurl}
          value={state.url}
        ></input>
        <button type="submit" onClick={handlesubmit}>
          Submit
        </button>
      </div>
      <div
        style={{
          margin: "1.5rem",
        }}
      >
        <img alt="" style={{ width: "30%" }} src={state.fianlfeed}></img>
      </div>
    </div>
  );
};

export default Remote;
