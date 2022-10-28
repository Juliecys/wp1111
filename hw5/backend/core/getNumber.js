function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //The maximum is inclusive and the minimum is inclusive
}

const max_number = 100
const min_number = 1
let answer = 0

const genNumber = () => {
    answer = getRandomIntInclusive(min_number, max_number)
    // return ( answer );
}

const getNumber = () => {
    return ( answer );
}

export {genNumber, getNumber};