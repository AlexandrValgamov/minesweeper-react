import "./Button.css"
import PropTypes from 'prop-types'

export default function Button({ option, onButtonClick }) {
  function handleClick() {
    onButtonClick(option)
  }

  return (
    <button
      className="button"
      aria-label={`Начать игру с уровнем сложности ${option.label}`}
      onClick={handleClick}
    >
      {`${option.label}`}
    </button>
  )
}

Button.propTypes = {
  option: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  onButtonClick: PropTypes.func,
}
