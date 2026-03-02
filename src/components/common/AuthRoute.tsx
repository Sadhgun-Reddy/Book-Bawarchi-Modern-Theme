import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

/**
 * AuthRoute Wrapper
 * Redirects authenticated users away from auth pages (login, signup) 
 * back to the home page or dashboard.
 */
const AuthRoute: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    if (isAuthenticated) {
        // If they are already logged in, send them to their respective dashboard or home
        const redirectPath = user?.role === 'caterer' || user?.role === 'admin' ? '/caterer' : '/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    // If not authenticated, allow access to child routes (login, signup)
    return <Outlet />;
};

export default AuthRoute;
