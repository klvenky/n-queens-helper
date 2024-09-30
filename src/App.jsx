import isEqual from "lodash/isEqual";
import React, { useEffect, useState } from "react";
import { Board } from "./components/Board";
import { LeftPanel } from "./components/LeftPanel";
import Solutions from "./utils/solutions";
import { findDisabledBlocks } from "./utils/util-funcs";
import { useSearchParams } from "react-router-dom";

import "./App.css";

function App() {
  const [searchParams] = useSearchParams();
  const queens = Number(searchParams.get("queens") || "4") || 4;

  const [queenBlocks, setQueenBlocks] = useState([]);
  const [noSolutionMessage, setNoSolutionMessage] = useState(false);
  const [disabledPositions, setDisabledPositions] = useState([]);

  useEffect(() => {
    const update = findDisabledBlocks(queens, queenBlocks);
    const shouldUpdate = !isEqual(update, disabledPositions);
    if (shouldUpdate) setDisabledPositions(update);
  }, [queens, disabledPositions, queenBlocks]);

  const removeAllQueens = () => setQueenBlocks([]);

  const showSolution = () => {
    const solution = Solutions[queens];
    if (solution) setQueenBlocks(solution);
    else setNoSolutionMessage(true);
  };

  return (
    <div className="App">
      <LeftPanel
        removeAllQueens={removeAllQueens}
        showSolution={showSolution}
        noSolutionMessage={noSolutionMessage}
      />
      <Board
        queens={queens}
        queenBlocks={queenBlocks}
        disabledPositions={disabledPositions}
        setDisabledPositions={setDisabledPositions}
        setQueenBlocks={setQueenBlocks}
      />
    </div>
  );
}

export default App;
