import React, { Component } from "react";
import { Navbar } from "react-nyx-components";

import { pushHash, RouterContext, RouterState } from "./Router";

import Home from "./Home";
import Toys from "./toys";
import Notes from "./notes";

type Props = {};

class Main extends Component<Props> {
  static pages = ["Home", "Toys", "Notes"];

  render() {
    // @ts-ignore
    const routerState: RouterState = this.context;
    const pageMatch = routerState.hashPath.match(/^\/([^/?#]+)/);
    let page;
    if (pageMatch && Main.pages.includes(pageMatch[1])) {
      page = pageMatch[1];
    } else if (routerState.hashPath == "" || routerState.hashPath == "/") {
      page = "Home";
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
          style={{ padding: "5px", flexShrink: 0, flexGrow: 0 }}
      >
          <Navbar
              selected={page}
              values={Main.pages}
              onChange={(selectedPage) => pushHash(`/${selectedPage}`)}
          />
      </div>
      <div style={{ flexShrink: 1, flexGrow: 1 }}>
          <Home />
          <Toys />
          <Notes />
      </div>
  </div>
);
  }
}

Main.contextType = RouterContext;

export default Main;
