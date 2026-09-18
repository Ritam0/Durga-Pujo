import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BannerPage from './BannerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/banner" element={<BannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
