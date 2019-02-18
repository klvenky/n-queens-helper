export const getBoxStyle = (checked, disabled) => {
  const dimension = 40;
  const background = checked ? 'gold' : disabled ? 'black' : 'white';
  return {
    width: `${dimension}px`,
    height: `${dimension}px`,
    display: 'inline-block',
    border: '1px solid',
    margin: '0',
    background,
    boxSizing: 'border-box',
  };
};

export function findDisabledBlocks(maxQueens, queenPositions) {
  const disabled = [];
  for (let i = 0; i < queenPositions.length; i += 1) {
    const { x, y } = queenPositions[i];
    for (let j = 0; j < maxQueens; j += 1) disabled.push({ x, y: j });
    for (let j = 0; j < maxQueens; j += 1) disabled.push({ x: j, y });
    for (let j = 0; j < maxQueens; j += 1) {
      const t1 = { x: x - j, y: y - j };
      const t2 = { x: x + j, y: y + j };
      const t3 = { x: x + j, y: y - j };
      const t4 = { x: x - j, y: y + j };
      if (t1.x >= 0 && t1.y >= 0) disabled.push(t1);
      if (t2.x < maxQueens && t2.y < maxQueens) disabled.push(t2);
      if (t3.x >= 0 && t3.y >= 0) disabled.push(t3);
      if (t4.x >= 0 && t4.y >= 0) disabled.push(t4);
    }
  }
  return disabled.reduce((ptOb, pt) => {
    let tmp = ptOb;
    if (tmp.indexOf(pt) === -1) tmp = ptOb.concat(pt);
    return tmp;
  }, []);
}
