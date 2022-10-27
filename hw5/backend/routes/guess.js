import express from 'express'
const router = express.Router()
import {genNumber, getNumber} from '../core/getNumber'

let Number = 0
// console.log(genNumber())
router.post('/start', (_, res) => {
    Number = genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
    res.json({ msg: 'The game has started.' })
    next()
})

router.get('/guess', (req, res) => {
    console.log("guess" + req)
    // 去 (memory) DB 拿答案的數字
    let answer = Number
    // 用 req.query.number 拿到前端輸入的數字
    let guessNumber = parseInt(req.query.number)
    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    if (guessNumber > 100 || guessNumber < 1) {
        // res.status(406).send({ msg: 'Not a legal number.' }) 
        res.status(406).send({ msg: 'Not a legal number.' })
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
    Number = genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB 
})

export default router