/* eslint-disable require-jsdoc */
import isEqual from 'lodash.isequal';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, ChessBox, Footer, LinkButton } from './components';
import reactLogo from './react-logo.svg';
import Solutions from './solutions';
import { findDisabledBlocks } from './util-funcs';

const DEFAULT = 8;
const ARR = [];
for (let i = 0; i < DEFAULT; i += 1) ARR[i] = i;

console.log('in app.jsx')
export default function App({ queens = 8 }) {
  const [positions, setQueenBlocks] = useState([]);
  const [noSolutionMessage, setNoSolutionMessage] = useState(false);
  const [disabledPositions, setDisabledPositions] = useState([]);

  useEffect(() => {
    const update = findDisabledBlocks(queens, positions);
    const shouldUpdate = !isEqual(update, disabledPositions);
    if (shouldUpdate) setDisabledPositions(update);
  }, [queens, disabledPositions, positions]);

  const removeQueenAt = (x, y) => {
    const temp = positions;
    let index = -1;
    for (let i = 0; i < queens; i++) {
      const queenBlck = positions[i];
      if (queenBlck.x === x && queenBlck.y === y) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      delete temp[index];
      setQueenBlocks(temp.filter((t) => t));
    }
  };

  const removeAllQueens = () => setQueenBlocks([]);

  const showSolution = () => {
    const solution = Solutions[queens];
    if (solution) setQueenBlocks(solution);
    else setNoSolutionMessage(true);
  };

  const toggleQueen = (x, y) => {
    const hasQueen = positions.find((point) => point.x === x && point.y === y);
    if (hasQueen) removeQueenAt(x, y);
    else {
      const disabledBlockClicked =
        disabledPositions.length > 0 &&
        disabledPositions.find((a) => a.x === x && a.y === y);

      console.log({
        disabled: !!disabledBlockClicked,
        disabledBlockClicked,
        hasQueen,
      });
      if (!disabledBlockClicked) {
        setQueenBlocks(positions.concat({ x, y }));
      }
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <img src={reactLogo} className="App-logo" alt="logo" />
          <p>Welcome to N-Queens Helper</p>
          <div>
            <Button onClick={removeAllQueens}>Reset</Button>
          </div>
          <div>
            <Button onClick={showSolution}>Solution</Button>
          </div>
          {noSolutionMessage && (
            <div>
              <p>Not all solutions are available.</p>
              <p>Please feel free to add your solutions.</p>
            </div>
          )}
          <div>
            <LinkButton href="https://github.com/klvenky">
              + Follow Me
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="div-bg">
        <div className="Queen-board">
          {ARR.map((x) => (
            <div key={`div-${x}`}>
              {ARR.map((y) => {
                const hasQueen = !!positions.find(
                  (a) => a.x === x && a.y === y
                );
                const disabled =
                  disabledPositions.findIndex((a) => a.x === x && a.y === y) !==
                  -1;
                return (
                  <ChessBox
                    key={`pos-${x}-${y}-${disabled}`}
                    x={x}
                    y={y}
                    checked={hasQueen}
                    disabled={disabled}
                    toggleQueen={toggleQueen}
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
