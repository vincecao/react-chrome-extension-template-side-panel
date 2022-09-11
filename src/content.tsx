/*global chrome*/
/* src/content.js */

import React, { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './MainPanel';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH } from '..';

export default function MainFrame({ onToggle }: { onToggle: (value: number) => void }): ReactElement {
  const [width, setWidth] = useState(APP_EXTEND_WIDTH);

  const FRAME_STYLE = {
    width: '100%',
    height: '100vh',
    border: 'none',
    padding: 0,
    margin: 0,
    overflow: 'none',
  };

  const FRAME_HEAD = [
    <link type="text/css" rel="stylesheet" href={window['chrome'].runtime.getURL('static/css/content.css')} />,
  ];

  return (
    // in building chrome crx need to use Frame for preventing mess up with original css
    <Frame style={FRAME_STYLE} head={FRAME_HEAD}>
      <FrameContextConsumer>
        {() => {
          function handleOnToggle() {
            const value = width !== APP_COLLAPSE_WIDTH ? APP_COLLAPSE_WIDTH : APP_EXTEND_WIDTH;
            setWidth(width === APP_COLLAPSE_WIDTH ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH);
            onToggle(value);
          }
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
              <MainPanel toggle={handleOnToggle} />
            </div>
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
}
