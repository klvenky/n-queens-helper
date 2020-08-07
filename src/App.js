import isEqual from "lodash/isEqual";
import React, { useEffect, useState } from "react";
import "./App.css";
import ChessBox from "./chess-box";
import reactLogo from "./react-logo.svg";
import { Button, LinkButton, Footer } from "./silly-comps";
import Solutions from "./solutions";
import { findDisabledBlocks } from "./util-funcs";

const DEFAULT = 8;
const ARR = [];
for (let i = 0; i < DEFAULT; i += 1) ARR[i] = i;

function App(props) {
  const { queens = 8 } = props;
  const [queenBlocks, setQueenBlocks] = useState([]);
  const [missingSolMsg, setMissingSolMsg] = useState(false);
  const [disabledPositions, setDisabledPositions] = useState([]);
  useEffect(() => {
    const update = findDisabledBlocks(queens, queenBlocks);
    const shouldUpdate = !isEqual(update, disabledPositions);
    if (shouldUpdate) setDisabledPositions(update);
  }, [queens, disabledPositions, queenBlocks]);
  const insertQueen = (x, y) => {
    const disabledBlock =
      disabledPositions.length > 0 &&
      disabledPositions.find((a) => a.x === x && a.y === y);
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
    if (index !== -1) {
      delete temp[index];
      setQueenBlocks(temp.filter((t) => t));
    }
  };
  const resetQueens = () => setQueenBlocks([]);
  const showSolution = () => {
    const solution = Solutions[queens];
    console.log(solution);
    if (solution) setQueenBlocks(solution);
    else setMissingSolMsg(true);
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <img src={reactLogo} className="App-logo" alt="logo" />
          <p>Welcome to N-Queens Helper</p>
          <div>
            <Button onClick={resetQueens}>Reset</Button>
          </div>
          <div>
            <Button onClick={showSolution}>Solution</Button>
          </div>
          {missingSolMsg && (
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
                const queenPlaced = !!queenBlocks.find(
                  (a) => a.x === x && a.y === y
                );
                const isDisabled = disabledPositions.find(
                  (a) => a.x === x && a.y === y
                );
                return (
                  <ChessBox
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
