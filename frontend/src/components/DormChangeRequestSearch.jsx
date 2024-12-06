import React, { useState } from 'react';

function DormChangeRequestSearch() {
    const dummyData = [
        { id: '1', name: 'Alice Chen', originalDorm: 'A', roomNumber: '101' },
        { id: '2', name: 'Bob Lin', originalDorm: 'B', roomNumber: '202' },
        { id: '3', name: 'Cathy Wang', originalDorm: 'C', roomNumber: '303' },
        { id: '4', name: 'David Lee', originalDorm: 'D', roomNumber: '404' },
        { id: '5', name: 'Emma Huang', originalDorm: 'E', roomNumber: '505' },
    ];

    const [searchDorm, setSearchDorm] = useState('');
    const [filteredRequests, setFilteredRequests] = useState(dummyData);

    const handleSearch = (e) => {
        e.preventDefault();
        const results = dummyData.filter(
            (request) => request.originalDorm.toUpperCase() === searchDorm.toUpperCase()
        );
        setFilteredRequests(results);
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
                    <label htmlFor="searchDorm">Original Dorm (e.g., A, B, C)</label>
                    <input
                        type="text"
                        id="searchDorm"
                        style={styles.input}
                        value={searchDorm}
                        onChange={(e) => setSearchDorm(e.target.value)}
                        placeholder="Enter dorm letter to search"
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Search
                </button>
            </form>

            {filteredRequests.length > 0 ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Student Name</th>
                            <th style={styles.th}>Student ID</th>
                            <th style={styles.th}>Original Dorm</th>
                            <th style={styles.th}>Room Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request) => (
                            <tr key={request.id}>
                                <td style={styles.td}>{request.name}</td>
                                <td style={styles.td}>{request.id}</td>
                                <td style={styles.td}>{request.originalDorm}</td>
                                <td style={styles.td}>{request.roomNumber}</td>
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

export default DormChangeRequestSearch;
