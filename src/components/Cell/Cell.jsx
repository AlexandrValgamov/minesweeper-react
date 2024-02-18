import "./Cell.css"
import PropTypes from "prop-types"

export default function Cell({ data, onLeftClick, onRightClick, gameOver }) {

  function handleLeftClick() {
    onLeftClick(data.y, data.x)
  }

  function handleRightClick(e) {
    e.preventDefault()
    onRightClick(data.y, data.x)
  }

  return (
    <div
      className={`cell ${data.isOpen ? 'cell_open' : ''} ${gameOver ? 'cell_disabled' : ''} ${data.isRed ? 'cell_color_red' : ''}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      <span className={`cell__icon  cell__icon_count_${data.count}`}>
        {
          `${data.isQuestion && !data.isOpen ? '❓' : (data.isFlagged && !data.isOpen ? '🚩' : (data.isOpen && data.isMine ? '💣' : (data.isOpen && data.count ? data.count : '')))}`
        }
      </span>
    </div>
  )
}

Cell.propTypes = {
  data: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    isRed: PropTypes.bool.isRequired,
    isFlagged: PropTypes.bool.isRequired,
    isMine: PropTypes.bool.isRequired,
    isQuestion: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
}
