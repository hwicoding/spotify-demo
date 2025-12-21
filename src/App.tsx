import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner/LoadingSpinner';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./Pages/SearchWithPage/SearchWithPage'));
const PlaylistDetailPage = React.lazy(() => import('./Pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./Pages/PlaylistPage/PlaylistPage'));
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
