import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import isEqual from 'lodash/isEqual';
import _find from 'lodash/find';
import { findDisabledPos, getBoxStyle } from './utils';

const DEFAULT = 8;
const ARR = [];
for (let i = 0; i < DEFAULT; i += 1) ARR[i] = i;

function App() {
  const [queens] = useState(DEFAULT);
  const [queenBlocks, setQueenBlocks] = useState([]);
  const [disabledPositions, setDisabledPositions] = useState([]);
  const insertQueen = (x, y) => {
    const disabledBlock = disabledPositions.length > 0 && disabledPositions.find(a => a.x === x && a.y === y);
    if (!disabledBlock) {
      setQueenBlocks(queenBlocks.concat({ x, y }));
    }
  };
  useEffect(() => {
    const update = findDisabledPos(queens, queenBlocks);
    if (!isEqual(update, disabledPositions)) setDisabledPositions(update);
  }, [queenBlocks]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to N-Queens Helper
        </p>
        <button onClick={() => setQueenBlocks([])}>Reset</button>
      </header>
      <div>
        {ARR.map(x => (
          <div key={`div-${x}`}>
            {ARR.map(y => {
              const queenPlaced = !!_find(queenBlocks, a => a.x === x && a.y === y);
              const isDisabled = _find(disabledPositions, a => (a.x === x && a.y === y));
              return (
                <Box
                  key={`pos-${x}-${y}-${isDisabled}`}
                  x={x}
                  y={y}
                  checked={queenPlaced}
                  onQueenPlace={insertQueen}
                  disabled={isDisabled}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
function Box(props) {
  const { checked, disabled, onQueenPlace, x, y } = props;
  const onClick = () => {
    if (!disabled) onQueenPlace(x, y);
  }
  return (
    <div style={getBoxStyle(checked, disabled)} onClick={onClick} key={`${x}-${y}`}>
    </div>
  );
}
export default App;

