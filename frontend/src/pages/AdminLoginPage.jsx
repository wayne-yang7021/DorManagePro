import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const { loginAdmin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from submitting and refreshing the page
        const success = await loginAdmin(email, password);  // Call login and await response
        if (success) {
            console.log("Login successful");
            navigate('/admin');  // Redirect to home page
        } else {
            console.log("Error logging in");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>admin login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>SSN:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <div style={styles.registerContainer}>
                <p style={styles.registerText}>
                    You are a student? {' '}
                    <a href="/login" style={styles.registerLink}>Login</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '20px',
        color: 'black'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        color: '#333',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        marginTop: '10px',
    },
    registerContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    registerText: {
        fontSize: '14px',
        color: '#555',
    },
    registerLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default AdminLoginPage;

// admin1@example.com
// M665645410