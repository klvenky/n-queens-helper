import React from "react";

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

