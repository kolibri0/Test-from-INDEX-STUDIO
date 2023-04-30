import React from 'react';
import './App.css';
import './module.d.ts'
import { Route, Router, Routes } from 'react-router-dom';
import CardPage from './Components/CardPage';
import HomePage from './Components/HomePage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<CardPage />} />
      </Routes>
    </div>
  );
}

export default App;
