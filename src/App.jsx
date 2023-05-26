import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Quiz from './components/Quiz'

function App() {
  return (
    <>
      <Header />
      <Quiz />
      <Footer />
    </>
  )
}

export default App
