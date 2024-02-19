import "./Game.css"
import { useEffect, useState, useCallback, useContext } from "react"
import { LeaderboardContext } from "../../contexts/LeaderboardContext";
import PropTypes from "prop-types"
import { generateBoard, getMinesPositions } from "../../utils/boardLogic"
import Cell from "../Cell/Cell"

export default function Game({ option }) {
  const { col, row } = option.gridSize
  const { leaders, setLeaders, name } = useContext(LeaderboardContext);
  const [board, setBoard] = useState(generateBoard(row, col));
  const [mineCounter, setMineCounter] = useState(option.mineCount)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(0)
  const [openedCells, setOpenedCells] = useState(0)
  const [flaggedCells, setFlaggedCells] = useState(0)
  const totalCells = option.gridSize.row * option.gridSize.col
  const [cellSize, setCellSize] = useState(24);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setCellSize(18)
      } else if (window.innerWidth >= 1200) {
        setCellSize(26)
      } else {
        setCellSize(24)
        if (row !== col) {
          setBoard(prev => transpose(prev))
          
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const transpose = (board) => {
    return Array.from({ length: board[0].length }, (_, colIndex) =>
      board.map(row => row[colIndex])
    );
  }

  useEffect(() => {
    let interval = null

    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [gameStarted, gameOver])

  const handleWin = useCallback(() => {
    setGameOver(true)
    setMineCounter(0)
    openWinBoard(board)
    updateLeaderboard()
  }, [board]);

  useEffect(() => {
    if ((totalCells - openedCells) === option.mineCount || (flaggedCells + openedCells) === totalCells) {
      handleWin();
    }
  }, [openedCells, flaggedCells, option.mineCount, totalCells, handleWin]);

  const updateLeaderboard = () => {
    const newLeader = {
      name: name,
      time: time
    }
    let updatedLeaders = [...leaders[option.level], newLeader];
    updatedLeaders = updatedLeaders.sort((a, b) => a.time - b.time).slice(0, 10)
    setLeaders(prevLeaders => ({
      ...prevLeaders,
      [option.level]: updatedLeaders
    }))
  }

  const handleLeftClick = (rowIndex, colIndex) => {
    if (gameOver || board[rowIndex][colIndex].isOpen) return
    let newBoard = [...board]

    if (!gameStarted) {
      setGameStarted(true)
      const minesPosition = getMinesPositions(option.gridSize.row, option.gridSize.col, rowIndex, colIndex, option.mineCount)

      minesPosition.forEach(pos => {
        newBoard[pos.y][pos.x] = { ...newBoard[pos.y][pos.x], isMine: true }

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = pos.x + dx;
            const ny = pos.y + dy;
            if (nx >= 0 && nx < newBoard[0].length && ny >= 0 && ny < newBoard.length && !(dx === 0 && dy === 0)) {
              const cell = newBoard[ny][nx];
              if (!cell.isMine) {
                newBoard[ny][nx] = { ...cell, count: cell.count + 1 };
              }
            }
          }
        }
      })
    }

    if (!board[rowIndex][colIndex].isFlagged && !board[rowIndex][colIndex].isQuestion) {
      setBoard(openCell(rowIndex, colIndex, newBoard))
    }
  }

  const handleLoss = (board, cell) => {
    setGameOver(true)
    openBoard(board)
    board[cell.y][cell.x].isRed = true
  }

  const openCell = (rowIndex, colIndex, newBoard) => {
    const cell = newBoard[rowIndex][colIndex]
    if (cell.isMine) {
      handleLoss(newBoard, cell)
    } else {
      if (!newBoard[rowIndex][colIndex].isFlagged && !newBoard[rowIndex][colIndex].isQuestion) {
        newBoard[rowIndex][colIndex].isOpen = true
        setOpenedCells(prev => prev + 1)
      }
      if (cell.count === 0) openNeighbors(cell, newBoard)
    }

    return newBoard
  }

  const openNeighbors = (cell, newBoard) => {
    const rows = newBoard.length;
    const cols = newBoard[0].length;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = cell.x + dx;
        const ny = cell.y + dy;
        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !(dx === 0 && dy === 0)) {
          const neighbor = newBoard[ny][nx];
          if (!neighbor.isOpen && !neighbor.isMine && !neighbor.isFlagged && !neighbor.isQuestion) {
            neighbor.isOpen = true;
            setOpenedCells(prev => prev + 1)
            if (neighbor.count === 0) {
              openNeighbors({ x: nx, y: ny }, newBoard);
            }
          }
        }
      }
    }
  }

  const openBoard = (board) => {
    board.map((row) =>
      row.map((cell) => {
        if (!cell.isOpen && cell.isMine) cell.isOpen = true
      }
      )
    )
  }

  const openWinBoard = (board) => {
    board.map((row) =>
      row.map((cell) => {
        if (!cell.isOpen && cell.isMine) cell.isFlagged = true
      }
      )
    )
  }

  const handleRightClick = (rowIndex, colIndex) => {
    if (gameOver) return

    if (board[rowIndex][colIndex].isQuestion) {
      const newBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            console.log(cell);
            return { ...cell, isQuestion: false }
          }
          return cell
        })
      )
      setBoard(newBoard)

    } else if (board[rowIndex][colIndex].isFlagged) {
      const newBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            setFlaggedCells(prev => prev - 1)
            return { ...cell, isFlagged: false, isQuestion: true }
          }
          return cell
        })
      )
      setMineCounter(prev => prev + 1)
      setBoard(newBoard)

    } else if (!board[rowIndex][colIndex].isOpen && (mineCounter !== 0)) {
      const newBoard = board.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            setFlaggedCells(prev => prev + 1)
            return { ...cell, isFlagged: true }
          }
          return cell
        })
      )
      setMineCounter(prev => prev - 1)
      setBoard(newBoard)
    }
  }

  const handleRestartClick = () => {
    if (gameStarted) setGameStarted(false)
    if (gameOver) setGameOver(false)
    setTime(0)
    setBoard(generateBoard(option.gridSize.row, option.gridSize.col))
    setMineCounter(option.mineCount)
    setOpenedCells(0)
    setFlaggedCells(0)
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${col}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${row}, ${cellSize}px)`,
  }

  const gameInfoStyle = { width: `${col * cellSize}px` }

  return (
    <section className="game">
      <div className="game__info" style={gameInfoStyle}>
        <div className="game__counter">{`\u{1F4A3} ${mineCounter}`}</div>
        <button className="game__button" onClick={handleRestartClick} />
        <div className="game__timer">{time}</div>
      </div>
      <div className="game__board" style={gridStyle}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data={cell}
              onLeftClick={handleLeftClick}
              onRightClick={handleRightClick}
              gameOver={gameOver}
            />
          )
        )}
      </div>
    </section>
  )
}

Game.propTypes = {
  option: PropTypes.shape({
    gridSize: PropTypes.shape({
      row: PropTypes.number,
      col: PropTypes.number,
    }),
    mineCount: PropTypes.number,
    level: PropTypes.string,
  }).isRequired,
  onButtonClick: PropTypes.func,
}