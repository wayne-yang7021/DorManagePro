import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/authContext";

function ViewTransferApplicationStatus() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8888/api/user/view_transfer_application_status?ssn=${user.ssn}`,
                    { credentials: 'include' }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch transfer application status');
                }

                const data = await response.json();
                setApplications(data);
                setError('');
            } catch (err) {
                console.error('Error fetching applications:', err);
                setApplications([]);
                setError(err.message || 'An error occurred');
            }
        };

        if (user?.ssn) {
            fetchApplications();
        }
    }, [user]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Transfer Application Status</h2>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            {applications.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Original Bed</th>
                            <th style={styles.th}>Move-In Bed</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Apply Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application, index) => (
                            <tr key={index} style={styles.dataRow}>
                                <td style={styles.td}>{application.originalBed}</td>
                                <td style={styles.td}>{application.moveInBed}</td>
                                <td style={{ ...styles.td, ...getStatusStyle(application.status) }}>
                                    {application.status}
                                </td>
                                <td style={styles.td}>{new Date(application.applyTime).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p style={styles.noData}>No transfer applications found.</p>
            )}
        </div>
    );
}

const getStatusStyle = (status) => ({
    color: status === 'approved' ? 'green' : status === 'denied' ? 'red' : 'black',
});

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '20px auto',
        border: '2px groove #c3c7cb',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Tahoma, sans-serif',
        boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
    },
    header: {
        backgroundColor: '#000080',
        color: 'white',
        padding: '10px',
        marginBottom: '20px',
        borderBottom: '1px solid #808080',
    },
    title: {
        margin: '0',
        fontSize: '1.2rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        border: '2px groove #c3c7cb',
    },
    headerRow: {
        backgroundColor: '#000080',
        color: 'white',
    },
    dataRow: {
        backgroundColor: '#e4e4e4',
    },
    th: {
        border: '1px solid #808080',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #c3c7cb',
        padding: '10px',
        textAlign: 'left',
    },
    noData: {
        marginTop: '20px',
        color: '#000080',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        backgroundColor: '#ffcccc',
        padding: '10px',
        border: '1px solid red',
    },
};

export default ViewTransferApplicationStatus;
