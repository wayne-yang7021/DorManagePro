import React, { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Authentication state

    // Login function
    const login = (email, password) => {
        // Simulate login with hardcoded credentials
        if (email === "user@example.com" && password === "password123") {
            const userData = { name: "John Doe", email };
            setUser(userData);
            return true;
        }
        return false;
    };

    // Logout function
    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};