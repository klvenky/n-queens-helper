import React from "react";
import crown from "./crown";
import { getBoxStyle } from "../utils/util-funcs";

export const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      style={{ margin: "0.5rem", padding: "0.5rem", alignSelf: "center" }}
    >
      {children}
    </button>
  );
};

export const Link = (props) => {
  const { children, ...rest } = props;
  const extra = {};
  if (rest.target === "_blank") extra.rel = "noreferrer noopener";
  return (
    <a {...rest} {...extra}>
      {children}
    </a>
  );
};

export const LinkButton = (props) => {
  const { children, ...rest } = props;
  return (
    <Link
      {...rest}
      target="_blank"
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Button>{children}</Button>
    </Link>
  );
};

export const Footer = () => {
  return (
    <div className="footer">
      Crown icon by{" "}
      <Link href="https://www.freepik.com/" title="Freepik">
        Freepik
      </Link>
      &nbsp;from&nbsp;
      <Link
        href="https://www.flaticon.com/"
        title="Flaticon"
        style={{ textDecorationColor: "red", textDecoration: "none" }}
      >
        flaticon&nbsp;
      </Link>
      is licensed by&nbsp;
      <Link
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
      >
        CC 3.0 BY
      </Link>
    </div>
  );
};

export function ChessBox(props) {
  const { checked, disabled, x, y, toggleQueen } = props;
  const onClick = () => {
    toggleQueen(x, y);
  };
  return (
    <div style={getBoxStyle(checked, disabled)} onClick={onClick}>
      {checked && crown()}
    </div>
  );
}
