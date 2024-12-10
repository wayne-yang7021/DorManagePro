import React from 'react';
import { useAuth } from "../context/authContext";
import Navbar from '../components/NavBar';

const UserInformation = () => {
    const { user } = useAuth();
    const { email, dormId, phone, bId, dueDate } = user;

    return (
        <div>
            <div style={styles.container}>
                <h1 style={styles.heading}>User Information</h1>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Field</th>
                            <th style={styles.th}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRow("Email", email)}
                        {renderRow("Phone", phone)}
                        {renderRow("Dorm ID", dormId)}
                        {renderRow("Bed", bId)}
                        {renderRow("Date to move out", dueDate)}
                    </tbody>
                </table>
                <div style={styles.footer}>
                    <p>&copy; 2024 Windows XP Style UI</p>
                </div>
            </div>
        </div>
    );
};

const renderRow = (field, value) => (
    <tr>
        <td style={styles.td}>{field}</td>
        <td style={styles.td}>{value}</td>
    </tr>
);

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '20px auto',
        border: '2px solid #5a5a5a',
        borderRadius: '10px',
        backgroundColor: '#d3d3d3',
        boxShadow: 'inset 2px 2px 8px rgba(255, 255, 255, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Tahoma, Geneva, sans-serif',
        color: '#000',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1a1a1a',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#e1e1e1',
    },
    th: {
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#c1c1c1',
        color: '#333',
        borderBottom: '2px solid #333',
        fontSize: '14px',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        textAlign: 'left',
        fontSize: '14px',
    },
    footer: {
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '14px',
        color: '#888',
    },
    errorMessage: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '18px',
        color: '#721c24',
    },
};

export default UserInformation;
