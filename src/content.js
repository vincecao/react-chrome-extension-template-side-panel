/*global chrome*/
/* src/content.js */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './MainPanel';
import Frame, { FrameContextConsumer } from 'react-frame-component';

const APP_EXTEND_WIDTH = 405;
const APP_COLLAPSE_WIDTH = 55;

// method one: create html tag wrapper
let htmlWrapper = document.querySelectorAll('html')[0];
htmlWrapper.id = 'html-wrapper';
htmlWrapper.style['margin-right'] = `${APP_EXTEND_WIDTH}px`;

// method two: create div wrapper
let divWrapper = document.createElement('div');
divWrapper.id = 'div-wrapper';

// Move the body's children into this wrapper
while (document.body.firstChild) {
  divWrapper.appendChild(document.body.firstChild);
}

// Append the wrapper to the body
document.body.appendChild(divWrapper);

// create react app
const app = document.createElement('div');
app.id = 'extension-root-v2';
app.style['max-width'] = `${APP_EXTEND_WIDTH}px`;

document.body.appendChild(app);

// Toogle on in building chrome crx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.click === true) {
    app.style.display = app.style.display === 'flex' ? 'none' : 'flex';
    htmlWrapper.style['margin-right'] = app.style.display === 'none' ? '0px' : app.style['max-width'];
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

const MainFrame = ({ chrome, window, doc, app, htmlWrapper }) => {
  const [width, setWidth] = useState(APP_EXTEND_WIDTH);

  return (
    // in building chrome crx need to use Frame for preventing mess up with original css
    <Frame
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        padding: 0,
        margin: 0,
        overflow: 'none',
      }}
      head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('static/css/content.css')} />]}
    >
      <FrameContextConsumer>
        {(document, window) => {
          return (
            <div
              style={{
                width: width - 5,
                height: '100%',
                position: 'absolute',
                right: 0,
                bottom: 0,
                zIndex: '2147483647',
                backgroundColor: '#F5F8FA',
                boxShadow: '0px 0px 5px #0000009e',
                transition: 'all 0.3s ease',
                overflow: 'none',
              }}
            >
              <MainPanel
                toggle={() => {
                  app.style['max-width'] =
                    width !== APP_COLLAPSE_WIDTH ? `${APP_COLLAPSE_WIDTH}px` : `${APP_EXTEND_WIDTH}px`;
                  htmlWrapper.style['margin-right'] =
                    width !== APP_COLLAPSE_WIDTH ? `${APP_COLLAPSE_WIDTH}px` : `${APP_EXTEND_WIDTH}px`;
                  setWidth(width === APP_COLLAPSE_WIDTH ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
                }}
              />
            </div>
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
};

ReactDOM.render(<MainFrame chrome={chrome} window={window} doc={document} app={app} htmlWrapper={htmlWrapper} />, app);
