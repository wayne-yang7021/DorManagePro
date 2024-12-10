import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/authContext";

function ViewFacilityReservation() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:8888/api/user/facilities_reservations?ssn=${user.ssn}`, {
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }

                const data = await response.json();
                setReservations(data);
                setError('');
            } catch (err) {
                console.error('Error fetching reservations:', err);
                setReservations([]);
                setError(err.message || 'An error occurred');
            }
        };
        
        if (user) {
            fetchReservations();
        }
    }, [user]);

    const handleCancel = async (reservation) => {
        try {
            const {ssn, fid, bookTime} = reservation
            const correctBookTime = new Date(bookTime);
            const response = await fetch(`http://localhost:8888/api/user/cancel_facilities_reservations`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ssn: ssn, fId: fid, bookTime:correctBookTime }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel reservation');
            }

            // Update the reservations state after cancellation
            setReservations((prev) =>
                prev.map((reservation) =>
                    (reservation.fid === fid && reservation.bookTime === bookTime ) ? { ...reservation, isCancelled: true } : reservation
                )
            );
        } catch (err) {
            console.error('Error cancelling reservation:', err);
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Your Facility Reservations</h2>
            </div>
    
            {error && <p style={styles.error}>{error}</p>}
    
            {reservations.filter(reservation => !reservation.isCancelled).length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Facility ID</th>
                            <th style={styles.th}>Booking Time</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations
                            .filter(reservation => !reservation.isCancelled)
                            .map((reservation) => (
                                <tr key={reservation.fid} style={styles.dataRow}>
                                    <td style={styles.td}>{reservation.fid}</td>
                                    <td style={styles.td}>{new Date(reservation.bookTime).toLocaleString()}</td>
                                    <td style={styles.td}>
                                        <button
                                            style={styles.cancelButton}
                                            onClick={() => handleCancel(reservation)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                !error && <p style={styles.noData}>You have no reservations.</p>
            )}
        </div>
    );
}

export default ViewFacilityReservation;

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
    cancelButton: {
        backgroundColor: '#c3c7cb',
        color: '#000',
        padding: '5px 10px',
        border: '2px outset #c3c7cb',
        cursor: 'pointer',
        boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
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