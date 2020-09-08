import React, { useState } from 'react';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import { __urls__ } from './const';
import { MyMenuBtn, MyModeBtn } from './extensionLayout/ShrinkBtnComponent';

const MainPanel = (props) => {
  let { toggle } = props;
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
        title={__urls__[index].name}
        src={__urls__[index].url}
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
        {__urls__.map((url, _index) => {
          return (
            <MyMenuBtn
              isFetch={false}
              icon={url.icon}
              alt={url.name}
              intent={url.intent}
              active={_index === index}
              onClick={() => {
                setIndex(_index);
                setIsToggle(!isToggle);
                toggle();
              }}
            />
          );
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
};

export default MainPanel;
