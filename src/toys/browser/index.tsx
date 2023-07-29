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

const disabledAccessorPaths = [
  "alert",
  "close",
  "confirm",
  "document.location.assign",
  "document.location.reload",
  "document.location.replace",
  "history.replaceState",
  "history.pushState",
  "history.forward",
  "history.back",
  "history.go",
  "location.assign",
  "location.reload",
  "location.replace",
  "open",
  "prompt",
  "print",
];

export interface ArgumentsResultMap {
  [args: string]: any;
}

class BrowserStudio extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  generateArgumentsResultMap(accessorPath: string): ArgumentsResultMap {
    const resultMap: ArgumentsResultMap = {};
    const workingIdeaArguments = [
      "()",
      '("")',
      //'("test")',
      "(0)",
      "(1)",
      "(null)",
      "(undefined)",
      //"({})",
      "(true)",
      "(false)",
      "([])",
      "([1])",
    ];
    for (const args of workingIdeaArguments) {
      try {
        const result = eval(`${accessorPath}${args};`);
        resultMap[args] = result;
      } catch (_) {}
    }
    return resultMap;
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
    if (objectAttributes.length === 0) {
      const prototype = Object.getPrototypeOf(object);
      // Browser crashes rather than present this info
      //console.log(String(prototype));
      if (
        ["[object OfflineResourceList]", "[object Storage]"].includes(
          String(prototype)
        )
      ) {
        return undefined;
      }
      //console.error(prototype);
      objectAttributes = Object.keys(prototype);
    }
    if (objectAttributes.length === 0) {
      return undefined;
    }
    const map = {};
    for (const attribute of objectAttributes) {
      if (attribute.length > 3 && prefix.indexOf(`.${attribute}`) >= 0) {
        continue;
      }
      let type =
        object === object[attribute] ? "self" : typeof object[attribute];
      const preview = String(object[attribute]);
      map[prefix ? `${prefix}.${attribute}` : attribute] = {
        type,
        preview,
      };
      const accessorPath = prefix ? `${prefix}.${attribute}` : attribute;
      if (type === "object" && object[attribute] !== null) {
        const children = this.objectToMap(
          object[attribute],
          depth + 1,
          prefix ? `${prefix}.${attribute}` : attribute
        );
        Object.keys(children || {}).forEach((childAttribute) => {
          map[childAttribute] = (children || {})[childAttribute];
        });
      } else if (
        type === "function" &&
        !disabledAccessorPaths.includes(accessorPath)
      ) {
        const resultArgumentsMap =
          this.generateArgumentsResultMap(accessorPath);
        for (const args in resultArgumentsMap) {
          map[
            prefix ? `${prefix}.${attribute}${args}` : `${attribute}${args}`
          ] = {
            type: "execution",
            preview: String(resultArgumentsMap[args]),
          };
        }
      }
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
