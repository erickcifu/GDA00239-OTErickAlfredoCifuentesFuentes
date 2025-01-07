import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { auth } = useContext(AuthContext);

    if (!auth.token) {
        return <Navigate to="/" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
