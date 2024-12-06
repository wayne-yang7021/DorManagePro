import React, { useState } from 'react';

function SnackReservationStatus() {
    // Dummy data
    const dummyData = [
        { snackName: 'French Fries', reservedCount: 10 },
        { snackName: 'Chicken Nuggets', reservedCount: 20 },
        { snackName: 'Cola', reservedCount: 15 },
        { snackName: 'Burger', reservedCount: 25 },
        { snackName: 'Ice Cream', reservedCount: 30 },
    ];

    const [filteredReservations, setFilteredReservations] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setFilteredReservations(dummyData); // Display all data as the result
        setShowResults(true); // Show the results
    };

    const styles = {
        container: {
            padding: '20px',
            width: '600px',
            maxWidth: '800px',
            margin: '20px auto', // Center horizontally and vertically
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        formGroup: {
            marginBottom: '15px',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            marginTop: '10px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '10px',
            backgroundColor: '#f2f2f2',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #ddd',
            padding: '10px',
        },
        noData: {
            marginTop: '20px',
            color: '#555',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Check Snack Reservation Status</h2>
            <form onSubmit={handleSearch}>
                <button type="submit" style={styles.button}>
                    Search
                </button>
            </form>

            {showResults && (
                <div>
                    {filteredReservations.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Snack Name</th>
                                    <th style={styles.th}>Reserved Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{reservation.snackName}</td>
                                        <td style={styles.td}>{reservation.reservedCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={styles.noData}>No reservation data available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SnackReservationStatus;
