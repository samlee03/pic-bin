import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import SavedPage from './pages/SavedPage';
import Preview from './pages/Preview';

export const PinnedContext = createContext(undefined);


function App() {
  const [pinned, setPinned] = useState([]);
  return (
    <Router>
      <div className='App'>
        <Header/>
        <div className='page-container'>
          <SideNav/>
          <PinnedContext.Provider value={{pinned, setPinned}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SavedPage" element={<SavedPage />} />
                <Route path="/preview/:id" element={<Preview />} />
            </Routes>
          </PinnedContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
