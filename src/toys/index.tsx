import React, { Component } from "react";

import { Navbar } from "react-nyx-components";

import Route, { pushHash, RouterContext, RouterState } from "../Router";
import AudioStudio from "./audio";
import BrowserStudio from "./browser";

type Props = {};

class Toys extends Component<Props> {
  static pages = ["Audio", "Browser"];
  render() {
    // @ts-ignore
    const routerState: RouterState = this.context;
    const pageMatch = routerState.hashPath.match(/^\/Toys\/([^/?#]+)/);
    let page;
    if (pageMatch && Toys.pages.includes(pageMatch[1])) {
      page = pageMatch[1];
    } else {
      page = "Audio";
    }
    return (
      <Route hashRegex={/^\/Toys$|^\/Toys\//}>
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div
                        style={{ padding: "5px", flexShrink: 0, flexGrow: 0 }}
                    >
                        <Navbar
                            selected={page}
                            values={Toys.pages}
                            onChange={(selectedPage) => pushHash(`/Toys/${selectedPage}`)}
                        />
                    </div>
                    <div style={{ flexShrink: 1, flexGrow: 1 }}>
                        <AudioStudio />
                        <BrowserStudio />
                    </div>
                </div>
      </Route>
    );
  }
}

Toys.contextType = RouterContext;

export default Toys;
