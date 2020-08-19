import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./override.css";
import Root from "./container/Root";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
serviceWorker.unregister();
