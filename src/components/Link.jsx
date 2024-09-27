import React from "react";
import { Button } from './Button';

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