import React from "react";
import { useSearchParams } from "react-router-dom";

const BOARD_SIZES = [4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function DropDown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queens = searchParams.get("queens") ?? "4";
  const switchBoardSize = (event) => {
    console.log(event.target.currentValue);
    setSearchParams({ queens: event.target.value });
  };

  return (
    <>
      <label>Select the board size</label>
      <select value={queens} onChange={switchBoardSize}>
        {BOARD_SIZES.map((size, si) => (
          <option key={`${size}-${si}`} value={`${size}`}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
}
