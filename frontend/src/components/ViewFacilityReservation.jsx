import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/authContext";

function ViewFacilityReservation() {
    const { user } = useAuth(); // 獲取使用者資訊
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:8888/api/user/facilities_reservations?ssn=${user.ssn}`, {
                    credentials: 'include', // 若有需要傳送 Cookie
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
            const {ssn, fId, bookTime} = reservation
            const correctBookTime = new Date(bookTime);
            const response = await fetch(`http://localhost:8888/api/user/cancel_facilities_reservations`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ssn: ssn, fId: fId, bookTime:correctBookTime }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel reservation');
            }

            // Update the reservations state after cancellation
            setReservations((prev) =>
                prev.map((reservation) =>
                    (reservation.fId === fId && reservation.bookTime === bookTime ) ? { ...reservation, isCancelled: true } : reservation
                )
            );
        } catch (err) {
            console.error('Error cancelling reservation:', err);
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Your Facility Reservations</h2>
    
            {error && <p style={styles.error}>{error}</p>}
    
            {reservations.filter(reservation => !reservation.isCancelled).length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Facility ID</th>
                            <th style={styles.th}>Booking Time</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations
                            .filter(reservation => !reservation.isCancelled) // 過濾已取消的預約
                            .map((reservation) => (
                                <tr key={reservation.fId}>
                                    <td style={styles.td}>{reservation.fId}</td>
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
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#555',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cancelledText: {
        color: '#888',
    },
    noData: {
        marginTop: '20px',
        color: '#555',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};
