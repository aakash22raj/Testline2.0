import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Guide from './pages/Guide/Guide'
import './index.css'
import Test from './pages/Test/Test'
import Board from './pages/Board/Board'

// import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/guide' element={<Guide />} />
          <Route path='/test' element={<Test />} />
          {/* <Route path='/leader-board' element={<ErrorBoundary><Board /></ErrorBoundary>} /> */}
          <Route path='/leader-board' element={<Board />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App