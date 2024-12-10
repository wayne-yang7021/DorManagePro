import React from 'react';
import AdminNavbar from '../components/AdminNavBar';
import { useAuth } from "../context/authContext";

function AdminInformation() {
    const { admin } = useAuth();

    if (!admin) {
        return (
            <div>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#721c24' }}>
                    Please login first
                </p>
            </div>
        );
    }

    const { email, dormId, phone } = admin;

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
            <AdminNavbar />
            <div style={styles.container}>
                <h1 style={styles.heading}>Admin Information</h1>
                {/* <p style={styles.paragraph}>
                    This is the Admin Information page where you can see the admin's personal information.
                </p> */}
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
                            <td style={styles.td}>Dorm ID</td>
                            <td style={styles.td}>{dormId}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Phone</td>
                            <td style={styles.td}>{phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminInformation;
