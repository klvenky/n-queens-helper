import React from "react";
import crown from "./crown";
import { getBoxStyle } from "../utils/util-funcs";

export function ChessBox(props) {
  const { checked, disabled, row, column, toggleQueen } = props;
  const onClick = () => {
    toggleQueen(row, column);
  };
  return (
    <div style={getBoxStyle(checked, disabled)} onClick={onClick}>
      {checked && crown()}
    </div>
  );
}
