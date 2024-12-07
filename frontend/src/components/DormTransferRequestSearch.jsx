import React, { useState } from 'react';

function DormTransferRequestSearch() {
    const [searchDorm, setSearchDorm] = useState('');
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchDorm) {
            setStudentData([]);
            setError('Please enter a dorm id to search.');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8888/api/admin/dorm_transfer_request_search?origin_dorm_id=${searchDorm}`
            );

            if (!response.ok) {
                throw new Error('Request not found');
            }

            const data = await response.json();
            setStudentData(data); // 不包裝成陣列，直接存取
            setError('');
        } catch (err) {
            setStudentData([]);
            setError(err.message || 'An error occurred');
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            width: '600px',
            margin: '20px auto',
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
            <h2>Search Dorm Change Requests</h2>
            <form onSubmit={handleSearch}>
                <div style={styles.formGroup}>
                    <label htmlFor="searchDorm">Original Dorm (e.g., DORM02)</label>
                    <input
                        type="text"
                        id="searchDorm"
                        style={styles.input}
                        value={searchDorm}
                        onChange={(e) => setSearchDorm(e.target.value)}
                        placeholder="Enter dorm ID to search"
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Search
                </button>
            </form>

            {error && <p style={styles.noData}>{error}</p>}

            {studentData.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Student ID</th>
                            <th style={styles.th}>Original Dorm</th>
                            <th style={styles.th}>Applying Dorm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((request, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{request.student_id}</td>
                                <td style={styles.td}>{request.origin_dorm}</td>
                                <td style={styles.td}>{request.applying_dorm}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={styles.noData}>No matching dorm change requests found</p>
            )}
        </div>
    );
}

export default DormTransferRequestSearch;
