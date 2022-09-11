import 'react-app-polyfill/ie11';

import * as React from 'react';
import { createRoot } from 'react-dom/client';

import MainFrame from './src/content';

export const APP_EXTEND_WIDTH = 405;
export const APP_COLLAPSE_WIDTH = 55;

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(app!);

function onToggle(value: number) {
  app.style['max-width'] = `${value}px`;
  htmlWrapper.style['margin-right'] = `${value}px`;
}

root.render(<MainFrame onToggle={onToggle} />);

// ------ chrome related workers
window['chrome'].runtime.onMessage.addListener(({ click, contextMenu, ping }, _sender, sendResponse) => {
  if (!!click) {
    app.style.display = app.style.display === 'flex' ? 'none' : 'flex';
    htmlWrapper.style['margin-right'] = app.style.display === 'none' ? '0px' : app.style['max-width'];
    return;
  }
  if (!!contextMenu) {
    // popWindow('open', request.screen, request.chromeWindows);
    return;
  }
  if (!!ping) {
    sendResponse({ pong: true });
    return;
  }
});
