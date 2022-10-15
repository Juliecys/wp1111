/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useRef, useEffect, useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const mineRef = useRef(null);
  const boardRef = useRef(null);
  const maxMineNum = 100;
  const maxBoardSize = 20;

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  const ShowOrHidePanel = () => {
    if (showPanel === true) {
      setShowPanel(false)
    }
    else {
      setShowPanel(true)
    }
  }
  const isError = () => {
    if (mineNum > Math.pow(boardSize, 2)) {
      setError(true)
    }
    else {
      setError(false)
    }
  }

  useEffect(() => {
    isError()
  }, [mineNum, boardSize]);

  return (
    <div className='HomeWrapper'>
      <p className='title'> MineSweeper </p>

      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={error? console.log('error'):startGameOnClick}> Start Game </button>

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}

      <div className='controlContainer'>
        <button className='btn' onClick={() => { ShowOrHidePanel() }}> Difficulty Adjustment </button>
          <div className='controlWrapper' style={{opacity: showPanel? 1:0}} >
            <div className='error' style={{ color: '#880000', opacity: error? 1:0}}> 
            ERROR: Mines number and board size are invalid!</div>
            <div className='controlPane'>
              <div className='controlCol'>
                <p className='controlTitle'> Mines Number </p>
                <input type='range' step='1' min='1' max={maxMineNum} defaultValue='10'
                  ref={mineRef} onChange={() => mineNumOnChange(mineRef.current.value)} />
                <p className='controlNum' style={{ color: error? '#880000':'#0f0f4b'}}> {mineNum} </p>
              </div>
              <div className='controlCol'>
                <p className='controlTitle'> Board Size (n×n)</p>
                <input type='range' step='1' min='1' max={maxBoardSize} defaultValue='8'
                  ref={boardRef} onChange={() => boardSizeOnChange(boardRef.current.value)} />
                <p className='controlNum' style={{ color: error? '#880000':'#0f0f4b'}}> {boardSize} </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );

}
export default HomePage;   