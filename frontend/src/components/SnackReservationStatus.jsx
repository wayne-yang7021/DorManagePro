import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import SnackReserveSearchButton from './SnackReserveSearchButton';

function SnackReservationStatus() {
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [semester, setSemester] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);
    const { admin } = useAuth();

    useEffect(() => {
        const fetchSemesterData = async () => {
            try {
                const response = await fetch('http://localhost:8888/api/admin/getSemester', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setSemester(data);
                } else {
                    console.error('Failed to fetch semesters');
                }
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };

        fetchSemesterData();
    }, []);

    // 計算 snack 出現次數
    const snackCount = filteredReservations.reduce((acc, reservation) => {
        acc[reservation.snack] = (acc[reservation.snack] || 0) + 1;
        return acc;
    }, {});

    // 將 snack 統計結果轉換為數組
    const snackCountArray = Object.entries(snackCount).map(([snack, count]) => ({
        snack,
        count,
    }));

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '20px auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        formGroup: {
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        select: {
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        error: {
            color: 'red',
            marginTop: '10px',
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
            <div style={styles.formGroup}>
                <select
                    style={styles.select}
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                >
                    <option value="">Choose Semester</option>
                    {semester.map((s, index) => (
                        <option key={index} value={s.semester}>
                            {s.semester}
                        </option>
                    ))}
                </select>
                <SnackReserveSearchButton
                    semester={selectedSemester.replace(/[()]/g, '')}
                    admin={admin}
                    setFilteredReservations={setFilteredReservations}
                    setError={setError}
                    setShowResults={setShowResults}
                />
            </div>
            {error && <p style={styles.error}>{error}</p>}

            {showResults && (
                <div>
                    {snackCountArray.length > 0 ? (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Snack Name</th>
                                    <th style={styles.th}>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {snackCountArray.map((item, index) => (
                                    <tr key={index}>
                                        <td style={styles.td}>{item.snack}</td>
                                        <td style={styles.td}>{item.count}</td>
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
