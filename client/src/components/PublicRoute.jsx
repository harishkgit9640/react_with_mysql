import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        // Redirect to appropriate dashboard based on user role
        const dashboard = user?.role === 'admin' ? '/dashboard' : '/user-dashboard';
        return <Navigate to={dashboard} state={{ from: location }} replace />;
    }

    return children;
};

export default PublicRoute; 