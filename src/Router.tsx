import React from "react";

type RouteProps = {
  hashRegex?: RegExp;
  pathnameRegex?: RegExp;
  children: any;
};

type RouterState = {
  pathname: string;
  query?: { [key: string]: string };
  hash?: { [key: string]: string } | string;
};

export const RouterContext = React.createContext({});

export class Router extends React.Component<any, RouterState> {
  constructor(props: any) {
    super(props);
    this.updateFunction = this.updateFunction.bind(this);
    this.state = this.parseStateLocation();
  }

  componentDidMount() {
    window.addEventListener("popstate", this.updateFunction);
    window.addEventListener("pushstate", this.updateFunction);
  }

  parseStateLocation(): RouterState {
    return {
      pathname: location.pathname,
      hash: location.hash ? location.hash.substring(1) : ""
    };
  }

  updateFunction() {
    this.setState(this.parseStateLocation());
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.updateFunction);
    window.removeEventListener("pushstate", this.updateFunction);
  }

  render() {
    const { children } = this.props;
    return (
      <RouterContext.Provider value={this.state}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export const pushPathname = (pathname: string) => {
  history.pushState(undefined, document.title, pathname);
  const createdEvent = document.createEvent("HTMLEvents");
  createdEvent.initEvent("pushstate", true, true);
  window.dispatchEvent(createdEvent);
};

export const pushHash = (hash: string) => {
  history.pushState(undefined, document.title, `${window.location.pathname}#${hash}`);
  const createdEvent = document.createEvent("HTMLEvents");
  createdEvent.initEvent("pushstate", true, true);
  window.dispatchEvent(createdEvent);
};

class Route extends React.Component<RouteProps> {
  render() {
    const { hashRegex, pathnameRegex, children } = this.props;
    const routerState = this.context;
    const activeByPathname = pathnameRegex && location.pathname.match(pathnameRegex);
    const activeByHash = hashRegex && (
      location.hash ? location.hash.substring(1).match(hashRegex) : "".match(hashRegex)
    );
    if (!activeByPathname && !activeByHash) {
      return null;
    }
    return (
      <RouterContext.Provider value={routerState}>
        {children}
      </RouterContext.Provider>
    );
  }
}

Route.contextType = RouterContext;

export default Route;
