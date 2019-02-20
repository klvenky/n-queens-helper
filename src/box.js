import React from 'react';
import crown from './crown';
import { getBoxStyle } from './util-funcs';

export default function Box(props) {
  const { checked, disabled, insertQueen, x, y, removeQueen } = props;
  const onClick = () => {
    if (!disabled) insertQueen(x, y);
    else if (checked) {
      console.log('remove queen', { x, y });
      removeQueen(x, y);
    }
  }
  return (
    <div style={getBoxStyle(checked, disabled)} onClick={onClick} key={`${x}-${y}`}>
      {checked && crown()}
    </div>
  );
}
