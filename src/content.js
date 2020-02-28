/*global chrome*/
/* src/content.js */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPanel from "./MainPanel";
import Frame, { FrameContextConsumer } from "react-frame-component";

let wrap = document.createElement("div");
wrap.id = "wrap";
// wrap.style.background = "yellow";
// wrap.style.border = "10px white solid";
wrap.style.width = "100vw";
wrap.style.height = "100vh";
wrap.style.overflow = "auto";
wrap.style.position = "relative";
wrap.style["margin-right"] = "405px";
wrap.style.transition = "all 0.3s";

// Move the body's children into this wrapper
while (document.body.firstChild) {
  // let testBody = document.createElement("div");
  // testBody.style.background = "green";
  // testBody.style.height = "100000px";
  // testBody.style["margin"] = "50px";
  wrap.appendChild(document.body.firstChild);
  // wrap.appendChild(testBody);
}

// Append the wrapper to the body
document.body.style.display = "flex";
document.body.style["flex-direction"] = "row";
document.body.style.width = "100vw";
document.body.style.height = "100vh";
document.body.style["flex-basis"] = "auto";
document.body.style.transition = "flex-basis 0.3s";
document.body.appendChild(wrap);
document.body.style.overflow = "hidden";

const app = document.createElement("div");
app.id = "extension-root-v2";
app.style.flex = "1";
app.style["max-width"] = "405px";
app.style.display = "block";
app.style.overflow = "hidden";
document.body.appendChild(app);

// Toogle on in building chrome crx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.click === true) {
    app.style.display = app.style.display === "block" ? "none" : "block";
    wrap.style["margin-right"] =
      app.style.display === "none" ? "0px" : app.style["max-width"];
    return;
  }
  if (request.contextMenu === true) {
    // popWindow('open', request.screen, request.chromeWindows);
    return;
  }
  if (request.ping) {
    sendResponse({ pong: true });
    return;
  }
});

class MainFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 0,
      width: 400
    };
  }

  render() {
    let { chrome, window, doc, app, wrap } = this.props;
    return (
      // in building chrome crx need to use Frame for preventing mess up with original css
      <Frame
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          padding: 0,
          margin: 0,
          overflow: "none"
        }}
        head={[
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL("/static/css/content.css")}
          />
        ]}
      >
        <FrameContextConsumer>
          {(document, window) => {

            return (
              <div
                style={{
                  width: this.state.width,
                  height: "100%",
                  position: "absolute",
                  right: this.state.right,
                  bottom: 0,
                  zIndex: "2147483647",
                  backgroundColor: "#F5F8FA",
                  boxShadow: "0px 0px 5px #0000009e",
                  transition: "all 0.3s ease",
                  overflow: "none"
                }}
              >
                <MainPanel
                  toggle={() => {
                    // siding to right, better performance, still have bug in chrome crx
                    // app.style["max-width"] =
                    //   this.state.right === 0 ? "55px" : "405px";
                    // wrap.style["margin-right"] =
                    //   this.state.right === 0 ? "55px" : "405px";
                    // this.setState({
                    //   ...this.state,
                    //   right: this.state.right === 0 ? -350 : 0
                    // });

                    // could also use shrink width Weak performance
                    app.style["max-width"] =
                      this.state.width !== 50 ? "55px" : "405px";
                    wrap.style["margin-right"] =
                      this.state.width !== 50 ? "55px" : "405px";
                    this.setState({
                      ...this.state,
                      width: this.state.width === 50 ? 400 : 50
                    });
                  }}
                />
              </div>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

ReactDOM.render(
  <MainFrame
    chrome={chrome}
    window={window}
    doc={document}
    app={app}
    wrap={wrap}
  />,
  app
);
