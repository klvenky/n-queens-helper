import React from "react";
import { Button } from "./Button";
import { LinkButton } from "./Link";
import reactLogo from "../react-logo.svg";
import DropDown from "./DropDown";

export function LeftPanel(props) {
  const { removeAllQueens, showSolution, noSolutionMessage } = props;
  return (
    <div className="App-header">
      <div>
        <img src={reactLogo} alt="logo" />
        <p>Welcome to N-Queens Helper</p>
        <div>
          <DropDown />
        </div>
        <div>
          <Button onClick={removeAllQueens}>Reset</Button>
        </div>
        <div>
          <Button onClick={showSolution}>Solution</Button>
        </div>
        {noSolutionMessage && (
          <div>
            <p>Not all solutions are available.</p>
            <p>Please feel free to add your solutions.</p>
          </div>
        )}
        <div>
          <LinkButton href="https://github.com/klvenky">+ Follow Me</LinkButton>
        </div>
      </div>
    </div>
  );
}
