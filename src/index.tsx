import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { Router } from "./Router";

import "css-nyx-theme/nyx.min.css";

import "./index.css";

const main = document.createElement("div");
main.style.height = "100%";
const body = document.querySelector("body");
body && body.appendChild(main);
ReactDOM.render(
    <Router>
        <Main />
    </Router>,
    main
);