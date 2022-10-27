import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')


  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }

  // useEffect(() => {
  //   console.log(number)
  // }, [number]);
  
  // Define three different views
  const startMenu = <div>
    <button onClick={async () => {setHasStarted(true); await startGame()}} > start game </button>
  </div>

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input type="text" placeholder="your guess" id="numberInput" name="guessNumber"
      onChange={(e)=>{ setNumber(e.target.value)}}/>
      
      <button
        onClick={handleGuess}
        disabled={!number}
      >guess!</button>
      <p>{status}</p>
    </>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button 
      // Handle restart for backend and frontend 
        onClick={async () => {setHasWon(false); await restart()}}
      >restart</button>
    </>)

  // Define states
  const game = (
    <div>
      {hasWon ?
        winningMode : gameMode}
    </div>)


  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
