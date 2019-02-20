import React from 'react';

export const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <button {...rest} style={{ margin: '0.5rem', padding: '0.5rem', alignSelf: 'center' }}>
      {children}
    </button>);
};

export const Link = (props) => {
  const { children, ...rest } = props;
  const extra = {};
  if (rest.target === '_blank') extra.rel = 'noreferrer noopener';
  return (<a {...rest} {...extra} >{children}</a>);
};

export const ButtonLink = (props) => {
  const { children, ...rest } = props;
  return (
    <Button>
      <Link {...rest} target="_blank" style={{ textDecoration: 'none' }}>
        {children}
      </Link>
    </Button>
  );
};
