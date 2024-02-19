export const generateBoard = (row, col) => {
  const board = new Array(row)
  for (let i = 0; i < row; i++) {
    board[i] = new Array(col)
    for (let j = 0; j < col; j++) {
      board[i][j] = {
        isOpen: false,
        isRed: false,
        isMine: false,
        isFlagged: false,
        isQuestion: false,
        x: j,
        y: i,
        count: 0,
      }
    }
  }

  return board
}

export const getMinesPositions = (row, col, currRow, currCol, mines) => {
  let count = mines
  const positions = []
  while (count > 0) {
    const newPosition = {
      x: Math.floor(Math.random() * col),
      y: Math.floor(Math.random() * row),
    }

    const isNotStart = currCol !== newPosition.x || currRow !== newPosition.y;

    const isUnique = !positions.some(position =>
      position.x === newPosition.x && position.y === newPosition.y
    );

    if (isNotStart && isUnique) {
      positions.push(newPosition)
      count--
    }
  }
  return positions
}