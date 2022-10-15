/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver }) {
  const [time, setTime] = useState(0);
  const [sTime, setSTime] = useState(0);

  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  // 計時器，每過一秒讓 time = time + 1
  useEffect(() => {
    console.log(time)
  }, [time])
  // var timer = setInterval(TimerFunction, 1000)
  // // if (gameOver === true) {
  // //   clearInterval(timer)
  // // }

  const StopTimer = () => {
    let stopTime = time
    // console.log(gameOver)
    if (gameOver) {
      setSTime(stopTime)
    }
  }

  

  useEffect(() => {
    clearInterval(timeIntervalId)
    setTime(0)
    console.log('gameOver', gameOver, time)
    StopTimer()
  }, [gameOver]);

  useEffect(() => {
    if (gameOver)
      return
    timeIntervalId = setInterval(() => setTime(time => time + 1), 1000)
    return () => clearInterval(timeIntervalId)
  }, [gameOver])

  // useEffect(() => {
  //   clearInterval(timer)
  // }, [time]);




  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {gameOver ? sTime : time}
          {/* game over = true 時 顯示 sTime ，反之顯示 time */}
        </div>
      </div>
    </div>
  );
}
