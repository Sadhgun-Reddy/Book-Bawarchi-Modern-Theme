import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUserProfile } from './store/slices/authSlice';
import Loading from './components/common/Loading';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorFallback from './components/common/ErrorFallback';
import AppRoutes from './Routes';

function App() {
  const dispatch = useAppDispatch();
  const { token, user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [token, user, dispatch]);

  // Prevent flashing content if we are fetching the user for the first time
  if (isLoading && token && !user) {
    return <Loading />;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <ScrollToTop />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset internal state if needed
          window.location.reload();
        }}
      >
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
