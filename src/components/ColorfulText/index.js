import React from "react";

function ColorfulText({ text, children, style }) {
  return (
    <div className="colorful-text" style={style}>
      {text || children}
    </div>
  );
}

export default ColorfulText;
