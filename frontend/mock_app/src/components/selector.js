import React, { useState } from "react";
import "../styles/selector.css";

function Selector ({ buttons, doSomethingAfterClick }){
    const [clickedId, setClickedId] = useState(0);
  
    const handleClick = (event, id) => {
      setClickedId(id);
      doSomethingAfterClick(event);
    };
  
    return (
      <>
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
      </>
    );
};

export default Selector;