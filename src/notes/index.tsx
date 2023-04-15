import React, { Component } from "react";

import Route from "../Router";

type Props = {};

class Notes extends Component<Props> {
  render() {
    return (
      <Route hashRegex={/^\/Notes$|^\/Notes\//}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flexShrink: 1, flexGrow: 1 }}>
                <h4>TODO: Consider...</h4>
                Thinking about the wisdom of keeping notes in a public place.
            </div>
        </div>
      </Route>
    );
  }
}

export default Notes;
