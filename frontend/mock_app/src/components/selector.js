import React, { useRef, useState } from "react";
import "../styles/selector.css";

function Selector ({ ref, buttons, doSomethingAfterClick }){
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (event, id) => {
    setClickedId(id);
    doSomethingAfterClick(event);
  };

  return (
    <div id="sel">
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={i === clickedId ? "customButton active" : "customButton"}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};

export default Selector;