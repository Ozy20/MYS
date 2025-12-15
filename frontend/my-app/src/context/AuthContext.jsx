import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                return jwtDecode(token);
            } catch (error) {
                console.error("Invalid token in storage", error);
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    });

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    const value = {
        user,
        login,
        logout,
        isManager: user?.role === 'manager',
        isEmployee: user?.role === 'employee',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};