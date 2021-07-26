import React, { Component } from "react";
import Route from "./Router";

type Props = {};

class Home extends Component<Props> {
  render() {
    return (
      <Route hashRegex={/(^$)|(^\/Home$)/}>
        <h1>Generic intro</h1>
        WIP
      </Route>);
  }
}

export default Home;