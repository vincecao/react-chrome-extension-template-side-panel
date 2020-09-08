import React from 'react';
import { Button, Intent, Spinner } from '@blueprintjs/core';

export const MyFetchBtn = (props) => {
  return (
    <>
      {!props.isFetch ? (
        <Button
          style={{ margin: 5, outline: 'none', width: 40 }}
          intent={props.intent}
          icon={props.icon}
          onClick={props.onClick}
          isFetch={props.isFetch}
          active={props.active}
          minimal={true}
        >
          {props.children}
        </Button>
      ) : (
        <Button
          style={{ margin: 5, outline: 'none', width: 40 }}
          intent={Intent.NONE}
          minimal={true}
          isFetch={props.isFetch}
          active={props.active}
        >
          <Spinner size={10} />
        </Button>
      )}
    </>
  );
};

export const MyMenuBtn = (props) => (
  <MyFetchBtn
    intent={props.intent}
    icon={props.icon}
    onClick={props.onClick}
    isFetch={props.isFetch}
    alt={props.alt}
    active={props.active}
  >
    {props.children}
  </MyFetchBtn>
);

export const MyModeBtn = (props) => (
  <Button
    style={{ outline: 'none', margin: 5, flex: 1, width: 40 }}
    active={!props.isToggle}
    minimal={true}
    onClick={props.onClick}
    icon={!props.isToggle ? 'caret-left' : 'caret-right'}
  />
);

export default { MyFetchBtn, MyMenuBtn, MyModeBtn };
