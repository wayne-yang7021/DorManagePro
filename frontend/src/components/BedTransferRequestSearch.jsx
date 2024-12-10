import React, { useState} from 'react';
import { useAuth } from "../context/authContext";

function BedTransferRequestSearch() {
    const { admin } = useAuth();
    const [moveApplicationData, setMoveApplicationData] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(true); // 控制表格顯示
    // console.log(admin)
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8888/api/admin/bed_transfer_request_search?applying_dorm_id=${admin.dormId}`
            );

            if (!response.ok) {
                throw new Error('Request not found');
            }

            const data = await response.json();
            // 僅保留 status 為 pending 的資料
            const pendingApplications = data.filter(application => application.status === 'pending');
            setMoveApplicationData(pendingApplications);
            setError('');
        } catch (err) {
            setMoveApplicationData([]);
            setError(err.message || 'An error occurred');
        }
    };

    const handleUpdateStatus = async (mId) => {
        try {
            const response = await fetch(`http://localhost:8888/api/admin/update_bed_transfer_status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mId, status: 'approved' }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // 更新成功後，移除該筆資料，讓表格即時更新
            setMoveApplicationData(prevData => prevData.filter(application => application.mId !== mId));
            alert('Status updated successfully');
        } catch (err) {
            alert(err.message || 'An error occurred while updating status');
        }
    };

    return (
        <div style={styles.container}>
            {admin && <h2>Dorm Transfer Requests in {admin.dormId}</h2>}
            <form onSubmit={handleSearch}>
                <button type="submit" style={styles.button}>
                    Search
                </button>
            </form>

            {error && <p style={styles.noData}>{error}</p>}

            {/* 切換表格顯示狀態的按鈕 */}
            <button
                onClick={() => setShowTable((prev) => !prev)}
                style={styles.tableButton}
            >
                {showTable ? 'Hide Table' : 'Show Table'}
            </button>

            {showTable && moveApplicationData.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Student ID</th>
                            <th style={styles.th}>Original Dorm</th>
                            <th style={styles.th}>Applying Dorm</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moveApplicationData.map((application, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{application.studentId}</td>
                                <td style={styles.td}>{application.originalBed}</td>
                                <td style={styles.td}>{application.moveInBed}</td>
                                <td style={styles.td}>{application.status}</td>
                                <td style={styles.td}>
                                    <button
                                        style={styles.updateButton}
                                        onClick={() => handleUpdateStatus(application.mId)}
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default BedTransferRequestSearch;

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
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
    tableButton: {
        padding: '8px 12px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        margin: '10px 0',
    },
    updateButton: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
    },
};
