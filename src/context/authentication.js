import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { LogoutUser } from '../redux/slices/userSlice';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('USER_DATA');
        localStorage.removeItem('USER_TOKEN');
        await dispatch(LogoutUser())
        navigate('/login', { replace: true });
    };

    const value = useMemo(() => ({ logout }), []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
