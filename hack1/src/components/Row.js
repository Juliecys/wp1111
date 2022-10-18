/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            {/* {console.log(guess[rowIdx])} */}
            {/* ↓ Default row, you should modify it. ↓ */}
            
            {typeof (guess[rowIdx]) === "undefined" ?
                (<div className='Row-wrapper'>
                    <div className='Row-wordbox' id={rowIdx + '-0'} key={rowIdx + '-0'}></div>
                    <div className='Row-wordbox' id={rowIdx + '-1'} key={rowIdx + '-1'}></div>
                    <div className='Row-wordbox' id={rowIdx + '-2'} key={rowIdx + '-2'}></div>
                    <div className='Row-wordbox' id={rowIdx + '-3'} key={rowIdx + '-3'}></div>
                    <div className='Row-wordbox' id={rowIdx + '-4'} key={rowIdx + '-4'}></div>
                </div>)
                : (<div className='Row-wrapper'>
                    <div className={'Row-wordbox'+ guess[rowIdx][0].color} id={rowIdx + '-0'} key={rowIdx + '-0'}> {guess[rowIdx][0]} </div>
                    <div className={'Row-wordbox' + guess[rowIdx][1].color} id={rowIdx + '-1'} key={rowIdx + '-1'}> {guess[rowIdx][1]} </div>
                    <div className={'Row-wordbox' + guess[rowIdx][2].color} id={rowIdx + '-2'} key={rowIdx + '-2'}> {guess[rowIdx][2]} </div>
                    <div className={'Row-wordbox' + guess[rowIdx][3].color} id={rowIdx + '-3'} key={rowIdx + '-3'}> {guess[rowIdx][3]} </div>
                    <div className={'Row-wordbox' + guess[rowIdx][4].color} id={rowIdx + '-4'} key={rowIdx + '-4'}> {guess[rowIdx][4]} </div>
                    {/* {console.log(guess[rowIdx])} */}
                    {/* <div className={'Row-wordbox' + guess[rowIdx][0].color} id={rowIdx + '-0'} key={rowIdx + '-0'}></div>
                <div className={'Row-wordbox' + guess[rowIdx][1].color} id={rowIdx + '-1'} key={rowIdx + '-1'}></div>
                <div className={'Row-wordbox' + guess[rowIdx][2].color} id={rowIdx + '-2'} key={rowIdx + '-2'}></div>
                <div className={'Row-wordbox' + guess[rowIdx][3].color} id={rowIdx + '-3'} key={rowIdx + '-3'}></div>
                <div className={'Row-wordbox' + guess[rowIdx][4].color} id={rowIdx + '-4'} key={rowIdx + '-4'}></div> */}
                </div>)}

            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;