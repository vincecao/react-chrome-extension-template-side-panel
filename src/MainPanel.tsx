import React, { ReactElement, useState } from 'react';
import { Button } from '@blueprintjs/core';
import { URLS } from './const';

export function MyModeBtn({ isToggle, onClick }): ReactElement {
  return <Button active={!isToggle} minimal onClick={onClick} icon={`caret-${!isToggle ? 'left' : 'right'}`} />;
}

export default function MainPanel({ toggle }: { toggle: () => void }): ReactElement {
  const [isToggle, setIsToggle] = useState(true);
  const [index, setIndex] = useState(0);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: 'none',
          opacity: isToggle ? 1 : 0,
          zIndex: isToggle ? 2 : -1,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
        }}
        title={URLS[index].name}
        src={URLS[index].url}
      />
      <div
        style={{
          position: 'absolute',
          width: 50,
          height: '100%',
          border: 'none',
          opacity: !isToggle ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: !isToggle ? 2 : -1,
          transition: 'all 0.3s ease',
        }}
      >
        {URLS.map((url, _index) => {
          return <button>{url.name}</button>;
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 50,
          zIndex: 3,
          display: 'flex',
        }}
      >
        <MyModeBtn
          isToggle={isToggle}
          onClick={() => {
            setIsToggle(!isToggle);
            toggle();
          }}
        />
      </div>
    </div>
  );
}
