import "./Settings.css"
import PropTypes from 'prop-types'
import Button from "../Button/Button"
import { useState, useContext, useEffect } from 'react'
import { LeaderboardContext } from "../../contexts/LeaderboardContext";

export default function Settings({ onButtonClick, gameOptions }) {
  const { name, setName } = useContext(LeaderboardContext);
  const [isNameValid, setIsNameValid] = useState(false);

  useEffect(() => {
    setName('')
  }, [setName])

  const handleNameChange = (e) => {
    setName(e.target.value);
    const isValid = e.target.value.length >= 2 && e.target.value.length <= 15;
    setIsNameValid(isValid);
  }

  return (
    <section className="settings">
      <h1 className="settings__title">Начать игру</h1>
      <label htmlFor="nameInput" className="settings__name-label">Ваше имя:</label>
      <input
        className="settings__name-input"
        placeholder="Введите имя"
        type="text"
        id="nameInput"
        name="name"
        value={name}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="15"
        size={25}
      />
      <ul className="settings__options">
        {gameOptions.map((option, index) =>
          <li key={index}>
            <Button
              option={option}
              onButtonClick={onButtonClick}
              isNameValid={isNameValid}
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
