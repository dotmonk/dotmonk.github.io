import React from'./node_modules/react/index.js';import ReactDOM from'./node_modules/react-dom/index.js';import Main from'./Main.js';const _ref=document.createElement("link");_ref.rel="stylesheet",_ref.href="/node_modules/css-nyx-theme/nyx.min.css",document.head.appendChild(_ref);const _ref2=document.createElement("link");_ref2.rel="stylesheet",_ref2.href="/index.css",document.head.appendChild(_ref2);const main=document.createElement("div");main.style.height="100%";const body=document.querySelector("body");body&&body.appendChild(main),ReactDOM.render(React.createElement(Main,null),main);