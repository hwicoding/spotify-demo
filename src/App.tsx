import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import AppLayout from './layout/AppLayout';
import HomePage from './Pages/HomePage/HomePage';
import SearchPage from './Pages/SearchPage/SearchPage';
function App() {
  return <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="search" element={<SearchPage />} />
      {/* <Route path="search:keyword" element={<SearchWithKeywordPage />} />
      <Route path="playlist/:id" element={<PlaylistDetailPage />} /> */}
      {/* <Route path="/playlist" element={<PlaylistPage/>}/> */}
    </Route>
  </Routes>;
}

export default App;
