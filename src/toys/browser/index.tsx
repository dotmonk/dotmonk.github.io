import React, { Component } from "react";
import Route from "../../Router";

type Props = {};

interface BrowserAttributeProperties {
  type: string;
  preview: string;
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
    depth: number = 0,
    prefix: string = ""
  ): BrowserAttributeMap | undefined {
    let objectAttributes = Object.keys(object);
    if (depth > 20) {
      return undefined;
    }
    if(objectAttributes.length === 0) {
      const prototype = Object.getPrototypeOf(object);
      // Browser crashes rather than present this info
      //console.log(String(prototype));
      if([
        "[object OfflineResourceList]",
        "[object Storage]"
      ].includes(String(prototype))) {
        return undefined;
      }
      //console.error(prototype);
      objectAttributes = Object.keys(prototype);
    }
    if(objectAttributes.length === 0) {
      return undefined;
    }
    const map = {};
    for (const attribute of objectAttributes) {
      if(attribute.length > 3 && prefix.indexOf(`.${attribute}`)>=0) {
        continue
      }
      let type =
        object === object[attribute] ? "self" : typeof object[attribute];
      const preview = String(object[attribute]);
      const children =
        type === "object" && object[attribute] !== null
          ? this.objectToMap(object[attribute], depth + 1, prefix ? `${prefix}.${attribute}` : attribute)
          : undefined;
      map[prefix ? `${prefix}.${attribute}` : attribute] = {
        type,
        preview
      };
      Object.keys(children || {}).forEach((childAttribute) => {
        map[childAttribute] = (children || {})[childAttribute];
      })
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
        <thead>
        <tr>
          <th>attribute</th>
          <th>typeof(attribute)</th>
          <th>preview</th>
        </tr>
        </thead>
        <tbody>
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
              </td>
            </tr>
          ))}
        </tbody>
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
