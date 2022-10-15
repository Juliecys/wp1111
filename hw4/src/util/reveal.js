/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

  if (x < 0 || x >= board.length || y < 0 || y >= board.length) // x, y 超出邊界，直接 return
  {
    return { board, newNonMinesCount };
  }

  else if (board[x][y].revealed === true) // 已經被揭露的格子，直接 return
  {
    return { board, newNonMinesCount };
  }

  else if (board[x][y].flagged === true) // 已經插旗子的格子，直接 return
  {
    return { board, newNonMinesCount };
  }

  else if (board[x][y].revealed !== true) // 需要揭露的情況
  {
    board[x][y].revealed = true;
    newNonMinesCount--;

    if (board[x][y].value === 0) {
      for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0)
            continue
          let temp = revealed(board, x + i, y + j, newNonMinesCount)
          board = temp.board
          newNonMinesCount = temp.newNonMinesCount
        }
      }
    }
  }

  return { board, newNonMinesCount };
};
