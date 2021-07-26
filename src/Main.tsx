import React, { Component } from "react";
import { Navbar } from "react-nyx-components";
import { pushHash, RouterContext } from "./Router";

import Home from "./Home";
import Toys from "./toys";

type Props = {};

class Main extends Component<Props> {
    static pages = [
        "Home",
        "Toys"
    ];

    render() {
        const routerState = this.context;
        const pageMatch = routerState.hash.match(/^\/([^/?#]+)/);
        let page;
        if (pageMatch && Main.pages.includes(pageMatch[1])) {
          page = pageMatch[1];
        } else if (routerState.hash == "" || routerState.hash == "/") {
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
                </div>
            </div>
        );
    }
}

Main.contextType = RouterContext;

export default Main;