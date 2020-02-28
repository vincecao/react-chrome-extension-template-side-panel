import React, { useState, useEffect } from "react";
import { Button, Intent, Spinner, Tooltip, Position } from "@blueprintjs/core";

export const MyFetchBtn = props => {
  return (
    //Tooltip is not well work under chrome crx condition
    <>
      {/* <Tooltip content={props.alt} position={Position.LEFT} usePortal={true}> */}
      {!props.isFetch ? (
        <Button
          style={{ margin: 5, outline: "none", width: 40 }}
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
            style={{ margin: 5, outline: "none", width: 40 }}
            intent={Intent.NONE}
            minimal={true}
            isFetch={props.isFetch}
            active={props.active}
          >
            <Spinner size={10} />
          </Button>
        )}
      {/* </Tooltip> */}
    </>
  );
};

export const MyMenuBtn = props => (
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

export const MyModeBtn = props => (
  // <Tooltip
  //   content={!props.isToggle ? "expand" : "collapse"}
  //   position={Position.RIGHT}
  // usePortal={false}
  // >
  <Button
    style={{ outline: "none", margin: 5, flex: 1, width: 40 }}
    active={!props.isToggle}
    minimal={true}
    onClick={props.onClick}
    icon={!props.isToggle ? "caret-left" : "caret-right"}
  />
  // </Tooltip>
);

export default { MyFetchBtn, MyMenuBtn, MyModeBtn };
