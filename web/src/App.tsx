import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import DERP from './components/Derp';
import HOME from './components/Home';
import NAVBAR from './components/NavBar';

export function App() {
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <NAVBAR />
          <Routes>
            <Route path="/" element={<HOME />} />
            <Route path="/derp" element={<DERP />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
