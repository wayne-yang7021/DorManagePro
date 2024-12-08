import React, { useState } from 'react';

function MaintenanceStatus() {
    const [searchDorm, setSearchDorm] = useState('');
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [error, setError] = useState('');
    const [completionDate, setCompletionDate] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchDorm) {
            setMaintenanceData([]);
            setError('Please enter a dorm ID to search.');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8888/api/admin/maintenance_status?dorm_id=${searchDorm}`
            );

            if (!response.ok) {
                throw new Error('Request not found');
            }

            const data = await response.json();
            setMaintenanceData(data);
            setError('');
        } catch (err) {
            setMaintenanceData([]);
            setError(err.message || 'An error occurred');
        }
        console.log(maintenanceData);
    };

    const handleUpdate = async (record) => {
        if (!completionDate) {
            setError('Please enter a completion date.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8888/api/admin/update_maintenance', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ssn: record.ssn,
                    dorm_id: record.dorm_id,
                    completedDate: completionDate,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to mark as completed');
            }
    
            const result = await response.json();
            console.log(result);
    
            // 成功後更新前端狀態
            setMaintenanceData((prevData) =>
                prevData.map((item) =>
                    item.ssn === record.ssn
                        ? { ...item, isCompleted: true, completedDate: completionDate }
                        : item
                )
            );
    
            setCompletionDate('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };
    
    

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
            marginBottom: '20px',
        },
        input: {
            width: '80%',
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
            <h2>Maintenance Status</h2>
            <form onSubmit={handleSearch}>
                <div style={styles.formGroup}>
                    <label htmlFor="searchDorm" style={{ marginRight: '20px' }}>Dorm ID</label>
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

            {maintenanceData.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Dorm</th>
                            <th style={styles.th}>Maintenance Info</th>
                            <th style={styles.th}>Completed</th>
                            <th style={styles.th}>Completion Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {maintenanceData.map((record, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{record.dorm_id}</td>
                            <td style={styles.td}>{record.description}</td>
                            <td style={styles.td}>{record.isCompleted ? 'Yes' : 'No'}</td>
                            <td style={styles.td}>{record.completedDate || 'N/A'}</td>
                            <td style={styles.td}>
                                {!record.isCompleted && (
                                    <div>
                                        <input
                                            type="date"
                                            style={styles.input}
                                            value={completionDate}
                                            onChange={(e) => setCompletionDate(e.target.value)}
                                        />
                                        <button
                                            style={styles.button}
                                            onClick={() => handleUpdate(record)} // 使用索引代替 ID
                                        >
                                            Mark as Completed
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MaintenanceStatus;
