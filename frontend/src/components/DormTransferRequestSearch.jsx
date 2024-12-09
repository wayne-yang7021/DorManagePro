import React, { useState } from 'react';
import { useAuth } from "../context/authContext";

function DormTransferRequestSearch() {
    const {admin} = useAuth()
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(true); // 控制表格顯示

    // if (admin != null) {
    //     console.log(admin)
    // }
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8888/api/admin/dorm_transfer_request_search?applying_dorm_id=${admin.dorm_id}`
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


    return (
        <div style={styles.container}>
            {admin && <h2>Dorm Transfer Requests in {admin.dorm_id}</h2>}
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

            {showTable && studentData.length > 0 &&
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
            }
        </div>
    );
}

export default DormTransferRequestSearch;

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
    tableButton: {
        padding: '8px 12px',
        backgroundColor: '#28a745', // 綠色
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        margin: '10px 0',
        transition: 'background-color 0.3s ease',
    },
    tableButtonHover: {
        backgroundColor: '#218838', // 更深的綠色
    },
};