import "./Leaderboard.css"
import { useContext, useState } from 'react'
import { LeaderboardContext } from "../../contexts/LeaderboardContext";

export default function Leaderboard() {
  const { leaders } = useContext(LeaderboardContext);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy')

  const handleClick = (difficulty) => {
    setCurrentDifficulty(difficulty)
  }

  return (
    <section className="leaderboard">
      <div className="leaderboard__difficulty-switch">
        <button className={`leaderboard__button ${currentDifficulty === 'easy' ? 'leaderboard__button_active' : ''}`} onClick={() => handleClick('easy')}>Простой</button>
        <button className={`leaderboard__button ${currentDifficulty === 'medium' ? 'leaderboard__button_active' : ''}`} onClick={() => handleClick('medium')}>Средний</button>
        <button className={`leaderboard__button ${currentDifficulty === 'hard' ? 'leaderboard__button_active' : ''}`} onClick={() => handleClick('hard')}>Сложный</button>
      </div>

      <table id="leaderboard" className="leaderboard__table">
        <thead>
          <tr className="leaderboard__row">
            <th className="leaderboard__header">Имя</th>
            <th className="leaderboard__header">Время</th>
          </tr>
        </thead>
        <tbody>
          {leaders && leaders[currentDifficulty] ? (leaders[currentDifficulty].map((user, index) =>
            <tr className="leaderboard__row" key={index}>
              <td className="leaderboard__cell">{user.name}</td>
              <td className="leaderboard__cell">{user.time}</td>
            </tr>
          )) : (
            <tr className="leaderboard__row">
              <td className="leaderboard__cell_type_error" colSpan="2">Нет данных...</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
