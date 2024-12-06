import React, { useState } from 'react';

function SnackReservationStatus() {
    // 假資料
    const dummyData = [
        { snackName: '薯條', reservedCount: 10 },
        { snackName: '雞塊', reservedCount: 20 },
        { snackName: '可樂', reservedCount: 15 },
        { snackName: '漢堡', reservedCount: 25 },
        { snackName: '冰淇淋', reservedCount: 30 },
    ];

    const [filteredReservations, setFilteredReservations] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setFilteredReservations(dummyData);  // 查詢結果為所有資料
        setShowResults(true);  // 顯示查詢結果
    };

    const styles = {
        container: {
            marginTop: '20px',
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
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
            <h2>查詢夜點預約狀況</h2>
            <form onSubmit={handleSearch}>
                <button type="submit" style={styles.button}>
                    查詢
                </button>
            </form>

            {showResults && (
                <div>
                    {filteredReservations.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>夜點名稱</th>
                                    <th style={styles.th}>預約人數</th>
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
                        <p style={styles.noData}>無預約資料</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SnackReservationStatus;
