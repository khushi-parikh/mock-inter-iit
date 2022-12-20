import React, { useRef, useState } from "react";
import './App.css';
import Navbar from './components/navbar';
import Selector from "./components/selector";
import Upload from "./components/button-upload";
import Remote from "./components/button-remote";
import Device from "./components/button-device";
import Landing from "./components/landing";

function App() {

  const [selectedButton, setSelectedButton] = useState("Upload Photo/Video");

  const printButtonLabel = (event) => {
    setSelectedButton(event.target.name)
    // console.log(selectedButton);
  };

  return (
    <div className="App">
      <Navbar/>
      <Landing/>
      <Selector
        buttons={["Upload Photo/Video", "Use Remote Device", "Use Device Camera"]}
        doSomethingAfterClick={printButtonLabel}
      />
      {selectedButton==="Upload Photo/Video" && <Upload />}
      {selectedButton==="Use Remote Device" && <Remote />}
      {selectedButton==="Use Device Camera" && <Device />}
    </div>
  );
}

export default App;
