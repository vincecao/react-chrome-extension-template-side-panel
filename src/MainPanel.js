import React, { useEffect, useState } from "react";
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Intent } from "@blueprintjs/core";
import { IFRAME_URLs } from "./Env";
import { MyMenuBtn, MyModeBtn } from "./extensionLayout/ShrinkBtnComponent";

const MainPanel = props => {
  let { toggle } = props;
  const [isToggle, setIsToggle] = useState(true);
  const [isBtn1, setIsBtn1] = useState(true);
  const [isBtn2, setIsBtn2] = useState(false);
  const [isBtn3, setIsBtn3] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        overflow: "hidden"
      }}
    >
      <iframe
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          border: "none",
          opacity: isToggle ? 1 : 0,
          zIndex: isToggle ? 2 : -1,
          transition: "all 0.3s ease",
          overflow: "hidden"
        }}
        title="ehr"
        src={IFRAME_URLs[isBtn1 ? 0 : isBtn2 ? 1 : isBtn3 ? 2 : 0]}
      />
      <div
        style={{
          position: "absolute",
          width: 50,
          height: "100%",
          border: "none",
          opacity: !isToggle ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          zIndex: !isToggle ? 2 : -1,
          transition: "all 0.3s ease"
        }}
      >
        <MyMenuBtn
          isFetch={false}
          icon={"draw"}
          alt="Vince Amazing"
          intent={Intent.DANGER}
          active={isBtn1}
          onClick={() => {
            setIsBtn1(!isBtn1);
            setIsBtn2(false);
            setIsBtn3(false);
            setIsToggle(!isToggle);
            toggle();
          }}
        />

        <MyMenuBtn
          isFetch={false}
          icon={"search"}
          alt="Code Sandbox"
          active={isBtn2}
          onClick={() => {
            setIsBtn1(false);
            setIsBtn2(!isBtn2);
            setIsBtn3(false);
            setIsToggle(!isToggle);
            toggle();
          }}
        />

        <MyMenuBtn
          isFetch={false}
          icon={"predictive-analysis"}
          alt="BlueprintJS"
          active={isBtn3}
          onClick={() => {
            setIsBtn1(false);
            setIsBtn2(false);
            setIsBtn3(!isBtn3);
            setIsToggle(!isToggle);
            toggle();
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 50,
          zIndex: 3,
          display: "flex"
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
