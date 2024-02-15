import "./Settings.css"
import PropTypes from 'prop-types'
import Button from "../Button/Button"

export default function Settings({ onButtonClick, gameOptions }) {
  return (
    <section className="settings">
      <h1 className="settings__title">Начать игру</h1>
      <ul className="settings__options">
        {gameOptions.map((option, index) =>
          <li key={index}>
            <Button
              option={option}
              onButtonClick={onButtonClick}
            />
          </li>
        )}
      </ul>
    </section>
  )
}

Settings.propTypes = {
  onButtonClick: PropTypes.func,
  gameOptions: PropTypes.array,
}
