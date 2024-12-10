import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Home from './pages/Home';
import SavedPage from './pages/SavedPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SavedPage" element={<SavedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
