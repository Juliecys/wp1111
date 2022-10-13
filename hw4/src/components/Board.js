/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        setBoard(newBoard.board) // 建立新的 board
        setMineLocations(newBoard.mineLocations) // 儲存地雷位置
        let non_mine_num = Math.pow(boardSize, 2) - mineNum
        setNonMineCount(non_mine_num) // 計算有多少個不是地雷的空格
        setRemainFlagNum(mineNum) // 儲存一開始有多少旗子（多少地雷）可以放
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();

        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        if (e.type === "contextmenu" && newBoard[x][y].revealed === false) {
            
            if (newBoard[x][y].flagged === false && remainFlagNum > 0) 
            {
                newBoard[x][y].flagged = true
                newFlagNum--
                setRemainFlagNum(newFlagNum)
                setBoard(newBoard)
            }
            else if (newBoard[x][y].flagged === true && remainFlagNum < mineNum)
            {
                newBoard[x][y].flagged = false
                newFlagNum++
                setRemainFlagNum(newFlagNum)
                setBoard(newBoard)
            }
        }
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        if (newBoard[x][y].value === '💣') // 點到地雷
        {
            newBoard[x][y].revealed = true
            // reveal every mine
            newBoard.map((row, i) => {
                return (
                    row.map((col, j) => {
                        if (newBoard[i][j].revealed === false && newBoard[i][j].value === '💣' && newBoard[i][j].flagged === false) {
                            newBoard[i][j].revealed = true
                        }
                    })
                )
            })
        }
        else { 
            if (newBoard[x][y].value !== 0) // 點到非地雷且周圍八宮格內有地雷的格子
            {
                newBoard[x][y].revealed = true
            }
            else // 點到周圍八宮格內沒有地雷（value = 0）的格子
            {
                newBoard[x][y].revealed = true
            }

            // if 
        }
        setBoard(newBoard)
        
        
        

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className="boardContainer">
                    <Dashboard
                        remainFlagNum={remainFlagNum}
                        gameOver={gameOver}
                    />
                    {board.map((row, i) => {
                        return (
                            <div id={"row" + board.indexOf(row)} style={{ display: 'flex' }}>
                                {row.map((col, j) => {
                                    return (
                                        <Cell
                                            rowIdx={row}
                                            colIdx={col}
                                            detail={board[i][j]}
                                            updateFlag={updateFlag}
                                            revealCell={revealCell}
                                        />
                                    );
                                }
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );



}

export default Board