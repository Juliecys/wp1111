import express from 'express'
const router = express.Router()
import {genNumber, getNumber} from '../core/getNumber'

let answer = 0
router.post('/start', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
    answer = getNumber()
    // console.log(answer)
    res.json({ msg: 'The game has started.' })
    // next()
})

router.get('/guess', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    

    // 用 req.query.number 拿到前端輸入的數字
    let theGuess = req.query.number
    let guessNumber = parseInt(theGuess, 10) 
    let stringGuess = guessNumber.toString()
    // 限制只能是十進位的數字，若非十進位且第一個參數為數字的話，會轉換到不能轉換的參數為止
    
    // let guessNumber = 1 * (theGuess) // 會自動判斷進位（8 進位、16 進位等等）轉換成數字

    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    if (guessNumber > 100 || guessNumber < 1 
        || guessNumber !== guessNumber // NaN !== NaN 所以用來禁止非數字的
        || theGuess.length !== stringGuess.length // 禁止十進位以外的表示法（e.g. 16 進位）、12abc 等等第一個參數為數字的狀況
        || Number.isInteger(guessNumber) === false) // 禁止小數等等非整數的數字
    {
        // res.status(406).send({ msg: 'Not a legal number.' }) 
        res.status(406).send({ msg: `Error: ${theGuess} is not a valid number (1 - 100)`})
    }
    // 如果沒有問題，回傳 status
    else {
        if (guessNumber === answer) {
            res.send({ msg: 'Equal' })
        }
        else if (guessNumber < answer) {
            res.send({ msg: 'Bigger' })
        }
        else {
            res.send({ msg: 'Smaller' })
        }
    }
})

router.post('/restart', (_, res) => {
    genNumber()
    answer = getNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
    // console.log(answer)
    res.json({ msg: 'The game has started.' })
})

export default router