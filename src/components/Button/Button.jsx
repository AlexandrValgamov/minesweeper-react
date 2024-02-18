import "./Button.css"
import PropTypes from 'prop-types'

export default function Button({ option, onButtonClick, isNameValid }) {
  function handleClick() {
    onButtonClick(option)
  }

  return (
    <button
      className={`button ${!isNameValid ? 'button_disabled' : ''}`}
      aria-label={`Начать игру с уровнем сложности ${option.label}`}
      onClick={handleClick}
      disabled={!isNameValid}
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
  isNameValid: PropTypes.bool,
}
