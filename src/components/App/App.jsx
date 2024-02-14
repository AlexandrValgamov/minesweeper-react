// import { useState } from 'react'
// import { Route, Routes } from "react-router-dom"
import './App.css'
import Header from "../Header/Header"

export default function App() {

  return (
    <div className="page">
      <Header />
      {/* <Routes >
        <Route
          path="/leaders"
          element={<Leaders />}
        />
        <Route
          path="/options"
          element={<Options />}
        />
        <Route
          path="/game"
          element={<Game />}
        />
        <Route
          path="/"
          element={<Main />}
        />
        <Route path="*" element={} />
      </Routes>
      <Footer /> */}
    </div>
  )
}
