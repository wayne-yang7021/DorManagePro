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

    const { email, dorm_id, phone, bId, dueDate} = user;

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '20px auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
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
        },
        th: {
            textAlign: 'left',
            padding: '10px',
            backgroundColor: '#f2f2f2',
            border: '1px solid #ddd',
        },
        td: {
            padding: '10px',
            border: '1px solid #ddd',
        },
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.heading}>user Information</h1>
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
            </div>
        </div>
    );
}

export default UserInformation;
