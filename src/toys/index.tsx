import React, { Component } from "react";

import { Navbar } from "react-nyx-components";

import Route, { pushHash, RouterContext } from "../Router";
import Audio from "./audio";

type Props = {};

class Toys extends Component<Props> {
    static pages = [
        "Audio"
    ];
    render() {
        const routerState = this.context;
        const pageMatch = routerState.hash.match(/^\/Toys\/([^/?#]+)/);
        const pages = [
            "Audio"
        ];
        let page;
        if (pageMatch && pages.includes(pageMatch[1])) {
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
                        <Audio />
                    </div>
                </div>
            </Route>);
    }
}

Toys.contextType = RouterContext;

export default Toys;