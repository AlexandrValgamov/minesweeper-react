import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css'
import Header from "../Header/Header"
import Settings from "../Settings/Settings"
import Game from '../Game/Game'
import Leaderboard from '../Leaderboard/Leaderboard'
import { gameOptions, defaultLeaders } from "../../utils/constants"
import { LeaderboardContext } from "../../contexts/LeaderboardContext";

export default function App() {
  const [option, setOption] = useState(gameOptions[0])
  const [leaders, setLeaders] = useState(() => {
    const savedLeaders = localStorage.getItem('leaders');
    return savedLeaders ? JSON.parse(savedLeaders) : defaultLeaders;
  })
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('leaders', JSON.stringify(leaders));
  }, [leaders]);

  function onButtonClick(option) {
    setOption(option)
    navigate('/game')
  }

  return (
    <LeaderboardContext.Provider value={{leaders, setLeaders}} >
    <div className="page">
      <Header />
      <Routes >
        <Route
          path="/"
          element={<Settings onButtonClick={onButtonClick} gameOptions={gameOptions} />}
        />
        <Route
          path="/game"
          element={<Game option={option} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />
        {/* <Route path="*" element={ } /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
    </LeaderboardContext.Provider >
  )
}
