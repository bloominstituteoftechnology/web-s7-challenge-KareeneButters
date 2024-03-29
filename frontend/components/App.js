import React from 'react'
import Home from './Home'
import Form from './Form'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
    <div id="app">
        {/* NavLinks here */}
      {/* Route and Routes here */}
    <Router>
      <nav>
    <Link to="/">Home</Link>
    <Link to="/form">Order</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home /> } />
      <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
