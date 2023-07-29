import React, { Component } from "react";

import { Textarea } from "react-nyx-components";

import Route from "../Router";

type Props = {};

class Notes extends Component<Props> {
  render() {
    return (
      <Route hashRegex={/^\/Notes$|^\/Notes\//}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flexShrink: 1, flexGrow: 0 }}>
                <h4>LocalStorage Notes</h4>
            </div>
            <Textarea
              onChange={(e) => {
                localStorage.setItem("notes",e.currentTarget.value);
                this.forceUpdate();
              }}
              value={localStorage.getItem("notes") || ""}
              style={{ flexShrink: 1, flexGrow: 1 }}
            />
        </div>
      </Route>
    );
  }
}

export default Notes;
