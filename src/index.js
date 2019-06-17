import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const styles = document.createElement("style");
styles.innerHTML = `
  a.active {
      font-weight: bold;
  }
`;

document.head.appendChild(styles);

ReactDOM.render(<App />, document.getElementById("root"));
