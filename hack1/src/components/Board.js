/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    const forRow = [0, 1, 2, 3, 4, 5]
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {forRow.map((row, rowIdx) => {
                if (rowIdx === turn) {
                    return (
                        <CurRow id={'row_' + rowIdx} key={'row_' + rowIdx} 
                            curGuess={curGuess} rowIdx={rowIdx}
                        />
                    );
                }
                else if (rowIdx <= turn){
                    return (
                        <Row id={'row_' + rowIdx} key={'row_' + rowIdx} 
                            guess={guesses} rowIdx={rowIdx} 
                        />
                    );
                }
                else {
                    return (
                        <Row id={'row_' + rowIdx} key={'row_' + rowIdx} 
                            guess={guesses} rowIdx={rowIdx} 
                        />
                    );
                }
            })}
        </div>
    )
};
export default Board;
