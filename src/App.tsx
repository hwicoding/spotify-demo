import React, { Suspense, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner/LoadingSpinner';
import { ToastProvider } from './common/components/Toast/ToastContext';
import useExchangeToken from './hooks/useExchangeToken';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./Pages/SearchWithPage/SearchWithPage'));
const PlaylistDetailPage = React.lazy(() => import('./Pages/PlaylistDetailPage/PlaylistDetailPage'));
const PlaylistPage = React.lazy(() => import('./Pages/PlaylistPage/PlaylistPage'));

const isExchanging = { current: false };

function App() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    // 127.0.0.1과 localhost 간의 데이터 공유 문제 해결을 위해 로그 출력
    if (code && !codeVerifier) {
      console.warn("Code received but code_verifier is missing. If you started login on 'localhost' and redirected to '127.0.0.1', localStorage is not shared.");
      // 도메인 불일치 시 사용자에게 알림 또는 리다이렉트 처리 로직 필요
    }

    if (code && codeVerifier && !isExchanging.current) {
      isExchanging.current = true;
      exchangeToken(
        { code, codeVerifier },
        {
          onSuccess: (data) => {
            // 토큰 저장 및 상태 업데이트로 UI 즉시 반영
            localStorage.setItem("accessToken", data.access_token);
            setAccessToken(data.access_token);

            // 쿼리 클라이언트 무효화 (useGetCurrentUserProfile react-query 사용 시 필요)
            // queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });

            navigate('/', { replace: true });
          },
          onError: (error) => {
            console.error("Token exchange failed:", error);
            navigate('/', { replace: true });
          }
        }
      );
    }
  }, [code, codeVerifier, exchangeToken, navigate]);

  return (
    <ToastProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
            <Route path="playlist/:id" element={<PlaylistDetailPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
