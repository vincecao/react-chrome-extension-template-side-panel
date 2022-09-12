import React, { ReactElement, useEffect, useState } from 'react';
import { APP_COLLAPSE_WIDTH, APP_EXTEND_WIDTH, URLS } from './const';
import classNames from 'classnames';
import Button from './components/Button';

export default function Panel({ onWidthChange, initialEnabled }: { onWidthChange: (value: number) => void, initialEnabled: boolean }): ReactElement {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [sidePanelWidth, setSidePanelWidth] = useState(enabled ? APP_EXTEND_WIDTH: APP_COLLAPSE_WIDTH);
  const [tabIndex, setTabIndex] = useState(0);

  function handleOnToggle(enabled: boolean) {
    const value = enabled ? APP_EXTEND_WIDTH : APP_COLLAPSE_WIDTH;
    setSidePanelWidth(value);
    onWidthChange(value);

    window['chrome'].storage?.local.set({enabled});
  }

  function openPanel(force?: boolean) {
    const newValue = force || !enabled;
    setEnabled(newValue);
    handleOnToggle(newValue);
  }

  return (
    <div
      style={{
        width: sidePanelWidth - 5,
        boxShadow: '0px 0px 5px #0000009e',
      }}
      className="absolute top-0 right-0 bottom-0 z-max bg-[#F5F8FA] ease-in-out duration-300 overflow-hidden"
    >
      <iframe
        className={classNames('absolute w-full h-full border-none ease-linear overflow-hidden', {
          'opacity-0': !enabled,
          '-z-10': !enabled,
        })}
        title={URLS[tabIndex].name}
        src={URLS[tabIndex].url}
      />
      <div
        className={classNames('absolute h-full flex border-none flex-col ease-linear w-[50px] space-y-3 p-1', {
          'opacity-0': enabled,
          '-z-10': enabled,
        })}
      >
        {URLS.map(({ name, image }, _index) => {
          function onMenuClick(index: number) {
            setTabIndex(index);
            openPanel(true);
          }
          return (
            <Button active={_index === tabIndex} onClick={() => onMenuClick(_index)} className="py-2">
              <img src={image} className="w-full" />
            </Button>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 w-[50px] z-10 flex justify-center items-center p-1">
        <Button active={enabled} onClick={() => openPanel()}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  enabled
                    ? 'M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25'
                    : 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
                }
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
  );
}
