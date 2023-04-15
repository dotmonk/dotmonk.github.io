import React, { Component } from "react";
import Route from "../../Router";

type Props = {};

interface BrowserAttributeProperties {
  type: string;
  preview: string;
  children?: BrowserAttributeMap;
}

interface BrowserAttributeMap {
  [attribute: string]: BrowserAttributeProperties;
}

type State = {
  data?: BrowserAttributeMap;
};

class BrowserStudio extends Component<Props, State> {
  audioContext: AudioContext;

  constructor(props: Props) {
    super(props);
    this.audioContext = new AudioContext();
    this.state = {};
  }

  objectToMap(
    object: Object,
    depth: number = 0
  ): BrowserAttributeMap | undefined {
    if (depth > 6 || Object.keys(object).length === 0) {
      return undefined;
    }
    const map = {};
    const objectAttributes = Object.keys(object);
    for (const attribute of objectAttributes) {
      const type =
        object === object[attribute] ? "self" : typeof object[attribute];
      const preview = String(object[attribute]);
      const children =
        type === "object" && object[attribute] !== null
          ? this.objectToMap(object[attribute], depth + 1)
          : undefined;
      map[attribute] = {
        type,
        preview,
        children,
      };
    }
    return map;
  }

  componentDidMount(): void {
    this.setState({ data: this.objectToMap(window) });
  }

  generateTable(map?: BrowserAttributeMap) {
    if (!map) {
      return null;
    }
    return (
      <table id="report" style={{ border: "solid 1px var(--nyx-color-text)" }}>
        <tr>
          <th>attribute</th>
          <th>typeof(attribute)</th>
          <th>preview</th>
        </tr>
        {Object.keys(map)
          .sort()
          .map((attribute, attributeIndex) => (
            <tr key={attributeIndex}>
              <td style={{ borderTop: "solid 1px var(--nyx-color-text)" }}>
                {attribute}
              </td>
              <td style={{ borderTop: "solid 1px var(--nyx-color-text)" }}>
                {map[attribute].type}
              </td>
              <td style={{ borderTop: "solid 1px var(--nyx-color-text)" }}>
                {map[attribute].preview}
                {map[attribute].children
                  ? this.generateTable(map[attribute].children || {})
                  : ""}
              </td>
            </tr>
          ))}
      </table>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <Route hashRegex={/^\/Toys\/Browser/}>
        <div>
          <h4>Reported data</h4>
          {this.generateTable(data)}
        </div>
      </Route>
    );
  }
}

export default BrowserStudio;
