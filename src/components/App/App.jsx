import { useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css'
import Header from "../Header/Header"
import Settings from "../Settings/Settings"
import Board from '../Board/Board'
import { gameOptions } from "../../utils/constants"

export default function App() {
  const [option, setOption] = useState(gameOptions[0])
  const navigate = useNavigate()

  function onButtonClick(option) {
    setOption(option)
    navigate('/game')
  }

  return (
    <div className="page">
      <Header />
      <Routes >
        <Route
          path="/"
          element={<Settings onButtonClick={onButtonClick} gameOptions={gameOptions} />}
        />
        <Route
          path="/game"
          element={<Board option={option} />}
        />
        {/* <Route
          path="/leaders"
          element={<Leaders />}
        />
        <Route
          path="/"
          element={<Main />}
        /> */}
        {/* <Route path="*" element={ } /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}
