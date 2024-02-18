import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import './App.css'
import Header from "../Header/Header"
import Settings from "../Settings/Settings"
import Game from '../Game/Game'
import Leaderboard from '../Leaderboard/Leaderboard'
import Footer from '../Footer/Footer'
import { gameOptions, defaultLeaders } from "../../utils/constants"
import { LeaderboardContext } from "../../contexts/LeaderboardContext";

export default function App() {
  const [option, setOption] = useState(gameOptions[0])
  const [name, setName] = useState('');
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
    <LeaderboardContext.Provider value={{ leaders, setLeaders, name, setName }} >
      <div className="page">
        <Header />
        <div className='page__content'>
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </LeaderboardContext.Provider >
  )
}
