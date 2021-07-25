import React, { Component } from "react";
import { Navbar, Panel } from "react-nyx-components";

type Props = {};

class Main extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const pages = [
            "Home",
            "Online",
            "Notes",
            "FileStudio",
            "AudioStudio",
            "Chess",
        ];
        return (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div
                    style={{ height: "38px", padding: "5px", flexShrink: 0, flexGrow: 0 }}
                >
                    <Navbar
                        selected={"Home"}
                        values={pages}
                        onChange={(selectedPage) => alert(selectedPage)}
                    />
                </div>
                <div style={{ flexShrink: 1, flexGrow: 1 }}>
                    <Panel>
                        Testing github actions
                    </Panel>
                </div>
            </div>
        );
    }
}

export default Main;