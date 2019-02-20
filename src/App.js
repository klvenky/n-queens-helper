import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import './App.css';
import Box from './box';
import reactLogo from './react-logo.svg';
import { Button, LinkButton, Footer } from './silly-comps';
import Solutions from './solutions';
import { findDisabledBlocks } from './util-funcs';

const DEFAULT = 8;
const ARR = [];
for (let i = 0; i < DEFAULT; i += 1) ARR[i] = i;

function App() {
  const [queens] = useState(DEFAULT);
  const [queenBlocks, setQueenBlocks] = useState([]);
  const [missingSolMsg, setMissingSolMsg] = useState(false);
  const [disabledPositions, setDisabledPositions] = useState([]);
  useEffect(() => {
    // console.log('curr queenBlocks ', queenBlocks);
    const update = findDisabledBlocks(queens, queenBlocks);
    const shouldUpdate = !isEqual(update, disabledPositions);
    // console.log('in effect2 shouldUpdate ===> ', shouldUpdate);
    // console.log('diabled ', update.length);
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
    // console.log('removing queen from queenBlocks at ', index);
    if (index !== -1) {
      delete temp[index];
      // console.log('updated remove ', temp.filter(t => t));
      setQueenBlocks(temp.filter(t => t));
    }
  };
  const resetQueens = () => setQueenBlocks([]);
  const showSolution = () => {
    const solution = Solutions[queens]
    console.log(solution);
    if (solution) setQueenBlocks(solution);
    else setMissingSolMsg(true);
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <img src={reactLogo} className="App-logo" alt="logo" />
          <p>
            Welcome to N-Queens Helper
          </p>
          <div><Button onClick={resetQueens}>Reset</Button></div>
          <div><Button onClick={showSolution}>Solution</Button></div>
          {missingSolMsg && (
            <div>
              <p>Not all solutions are available.</p>
              <p>Please feel free to add your solutions.</p>
            </div>)}
          <div>
            <LinkButton href="https://github.com/klvenky">+ Follow Me</LinkButton>
          </div>
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
        <Footer />
      </div>
    </div>
  );
}

export default App;

