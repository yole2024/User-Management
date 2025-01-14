import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const authToken = localStorage.getItem('authToken'); 
    return authToken ? <>{children}</> : <Navigate to="/login" />;};

export default AuthGuard;