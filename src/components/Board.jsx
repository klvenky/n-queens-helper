import isEqual from "lodash/isEqual";
import React, { useEffect } from "react";
import { ChessBox } from "./ChessBox";
import { Footer } from "./Footer";
import { findDisabledBlocks } from "../utils/util-funcs";

export function Board(props) {
  const {
    queens,
    queenBlocks,
    disabledPositions,
    setDisabledPositions,
    setQueenBlocks,
  } = props;
  const ARR = [];
  for (let i = 0; i < queens; i += 1) ARR[i] = i;

  useEffect(() => {
    const update = findDisabledBlocks(queens, queenBlocks);
    const shouldUpdate = !isEqual(update, disabledPositions);
    if (shouldUpdate) setDisabledPositions(update);
  }, [queens, disabledPositions, queenBlocks, setDisabledPositions]);

  const removeQueenAt = (x, y) => {
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

  const toggleQueen = (row, column) => {
    const hasQueen = queenBlocks.find(
      (block) => block.x === row && block.y === column
    );
    if (hasQueen) removeQueenAt(row, column);
    else {
      const disabledBlockClicked =
        disabledPositions.length > 0 &&
        disabledPositions.find((a) => a.x === row && a.y === column);

      if (!disabledBlockClicked) {
        setQueenBlocks(queenBlocks.concat({ x: row, y: column }));
      }
    }
  };

  return (
    <div className="div-bg">
      <div className="Queen-board">
        {ARR.map((row) => (
          <div key={`div-${row}`}>
            {ARR.map((column) => {
              const hasQueen = !!queenBlocks.find(
                (a) => a.x === row && a.y === column
              );
              const disabled =
                disabledPositions.findIndex(
                  (a) => a.x === row && a.y === column
                ) !== -1;
              return (
                <ChessBox
                  key={`pos-${row}-${column}-${disabled}`}
                  row={row}
                  column={column}
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
  );
}
