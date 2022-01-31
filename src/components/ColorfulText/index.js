import React from "react";

import { colorful_text } from "./ColorfulText.module.css";

function ColorfulText({ text, children, style }) {
  return (
    <div className={colorful_text} style={style}>
      {text || children}
    </div>
  );
}

export default ColorfulText;
