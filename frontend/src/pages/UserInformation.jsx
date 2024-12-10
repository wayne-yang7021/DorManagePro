import React from 'react';
import { useAuth } from "../context/authContext";
import Navbar from '../components/NavBar';

function UserInformation() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#721c24' }}>
                    Please login first
                </p>
            </div>
        );
    }

    const { email, dorm_id, phone, bId, dueDate } = user;

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
        paragraph: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#555',
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
    };

    return (
        <div>
            <Navbar />
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
                        <tr>
                            <td style={styles.td}>Email</td>
                            <td style={styles.td}>{email}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Phone</td>
                            <td style={styles.td}>{phone}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Dorm ID</td>
                            <td style={styles.td}>{dorm_id}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Bed</td>
                            <td style={styles.td}>{bId}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Date to move out</td>
                            <td style={styles.td}>{dueDate}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={styles.footer}>
                    <p>&copy; 2024 Windows XP Style UI</p>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;