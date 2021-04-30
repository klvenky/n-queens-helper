export const getBoxStyle = (checked, disabled) => {
  const dimension = 40;
  let background = 'white';
  if (checked) background = 'gold';
  else if (disabled) background = 'black';

  return {
    width: `${dimension}px`,
    height: `${dimension}px`,
    display: 'inline-block',
    border: '1px white',
    margin: '1px',
    padding: '1px ',
    background,
    boxSizing: 'border-box',
  };
};

function findIfExists(arr, val, findFunc = (a) => a === val) {
  return arr.find(findFunc);
}

export function findDisabledBlocks(max, positions) {
  const disabled = [];
  const shouldDisable = (pt) => {
    const findFunc = ([vx, vy]) => ([px, py]) => vx === px && vy === py;
    const findFromPosFunc = ([vx, vy]) => (point) => {
      const { px, py } = point;
      return vx === px && vy === py;
    };
    const disableFound = findIfExists(disabled, pt, findFunc(pt));
    const queenFound = findIfExists(positions, pt, findFromPosFunc(pt));
    return !queenFound && !disableFound;
  };
  for (let i = 0; i < positions.length; i += 1) {
    const { x, y } = positions[i];
    for (let j = 0; j < max; j += 1) {
      const cpx = [x, j];
      const cpy = [j, y];
      if (shouldDisable(cpx)) disabled.push(cpx);
      if (shouldDisable(cpy)) disabled.push(cpy);
    }
    for (let j = 0; j < max; j += 1) {
      const pts = [
        [x - j, y - j],
        [x + j, y + j],
        [x + j, y - j],
        [x - j, y + j],
      ];
      pts.forEach((cp) => {
        const [cx, cy] = cp;
        const newPosToDisable = shouldDisable(cp);
        if (newPosToDisable && cx >= 0 && cx < max && cy >= 0 && cy < max) {
          disabled.push(cp);
        }
      });
    }
  }
  return disabled.map(([x, y]) => ({ x, y }));
}
