import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import './App.css';
import Box from './box';
import logo from './logo.svg';
import { findDisabledBlocks } from './utils';

const DEFAULT = 8;
const ARR = [];
for (let i = 0; i < DEFAULT; i += 1) ARR[i] = i;

const Link = (props) => {
  const { children, ...rest } = props;
  return (<a {...rest} rel="noreferrer noopener">{children}</a>);
}
function App() {
  const [queens] = useState(DEFAULT);
  const [queenBlocks, setQueenBlocks] = useState([]);
  const [disabledPositions, setDisabledPositions] = useState([]);
  useEffect(() => {
    console.log('curr queenBlocks ', queenBlocks);
    const update = findDisabledBlocks(queens, queenBlocks);
    const shouldUpdate = !isEqual(update, disabledPositions);
    // console.log('in effect2 shouldUpdate ===> ', shouldUpdate);
    console.log('diabled ', update.length);
    if (shouldUpdate) setDisabledPositions(update);
  }, [queenBlocks]);
  const insertQueen = (x, y) => {
    const disabledBlock = disabledPositions.length > 0 && disabledPositions.find(a => a.x === x && a.y === y);
    if (!disabledBlock) setQueenBlocks(queenBlocks.concat({ x, y }));
  };
  const removeQueen = (x, y) => {
    const temp = queenBlocks;
    let index = -1;
    for (let i = 0; i < queens; i++) {
      const queenBlck = queenBlocks[i];
      if (queenBlck.x === x && queenBlck.y === y) {
        index = i;
        break;
      }
    }
    console.log('removing queen from queenBlocks at ', index);
    if (index >= 0) {
      temp.splice(index, 1);
      console.log('updated remove ', temp);
      setQueenBlocks(temp);
    }
  };
  const resetQueens = () => setQueenBlocks([]);
  return (
    <div className="App">
      <div className="App-header">
        <div style={{ alignContent: 'center' }}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to N-Queens Helper
          </p>
          <button onClick={resetQueens}>Reset</button>
        </div>
      </div>
      <div className="div-bg">
        <div className="Queen-board">
          {ARR.map(x => (
            <div key={`div-${x}`}>
              {ARR.map(y => {
                const queenPlaced = !!queenBlocks.find(a => a.x === x && a.y === y);
                const isDisabled = disabledPositions.find(a => (a.x === x && a.y === y));
                return (
                  <Box
                    key={`pos-${x}-${y}-${isDisabled}`}
                    x={x}
                    y={y}
                    checked={queenPlaced}
                    insertQueen={insertQueen}
                    disabled={isDisabled}
                    removeQueen={removeQueen}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <footer>
          <div style={{ textAlign: 'center' }}>
            Crown icon by <Link href="https://www.freepik.com/" title="Freepik">Freepik</Link>&nbsp;from&nbsp;
            <Link href="https://www.flaticon.com/" title="Flaticon" style={{ textDecorationColor: 'red', textDecoration: 'none' }}>
            flaticon&nbsp;</Link>is licensed by&nbsp;
            <Link href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

