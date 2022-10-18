/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div className='Row-wordbox filled' id={rowIdx + '-0'} key={rowIdx + '-0'}></div>
                <div className='Row-wordbox filled' id={rowIdx + '-1'} key={rowIdx + '-1'}></div>
                <div className='Row-wordbox filled' id={rowIdx + '-2'} key={rowIdx + '-2'}></div>
                <div className='Row-wordbox filled' id={rowIdx + '-3'} key={rowIdx + '-3'}></div>
                <div className='Row-wordbox filled' id={rowIdx + '-4'} key={rowIdx + '-4'}></div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
