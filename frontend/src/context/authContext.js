import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null); // Holds admin data

    useEffect(() => {
        // Check authentication for both user and admin on initial load
        setLoading(true);
        try {
            Promise.all([checkAuthentication(), checkAdminAuthentication()]);
        } catch {
            // Handle any errors
        } finally {
            setLoading(false);
        }
    }, []);


    const checkAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:8888/api/user', {
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        } catch (error) {
            console.error('Authentication check failed:', error);
            setUser(null);
            setLoading(false);
        }
    };

    // Check if an admin is authenticated
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:8888/api/admin/fetch', {
                credentials: 'include',
            });

            if (response.ok) {
                const adminData = await response.json();
                setAdmin(adminData);
            } else {
                setAdmin(null);
            }
        } catch (error) {
            console.error('Admin authentication check failed:', error);
            setAdmin(null);
        }
    };
    
    const login = async (student_id, ssn) => {
        try {
            // Make POST request to backend to authenticate the user
            const response = await fetch('http://localhost:8888/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important for sending cookies (JWT token)
                body: JSON.stringify({ student_id, ssn }), // Sending data to backend
            });
    
            if (response.ok) {
                // If login is successful, process the response
                const userData = await response.json();
    
                // Optionally, trigger authentication check to load user data
                await checkAuthentication();
    
                // Inform that login was successful
                return true;
            } else {
                // If login failed, throw an error with specific message
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(`Login failed: ${error.message}`); // Provide the error message to the user
            return false;
        }
    };


    // Admin login
    const loginAdmin = async (admin_email, password) => {
        try {
            const response = await fetch('http://localhost:8888/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ admin_email, password }),
            });

            if (response.ok) {
                await checkAdminAuthentication();
                return true;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Admin login failed');
            }
        } catch (error) {
            console.error('Admin login error:', error);
            alert(`Admin login failed: ${error.message}`);
            return false;
        }
    };

    const logout = async () => {
        try {
            // Optional: Implement a backend logout endpoint to invalidate token
            await fetch('http://localhost:8888/api/logout', { 
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
        setUser(null);
        return true;

        
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            admin,
            loginAdmin,
            login, 
            logout, 
            loading,
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);