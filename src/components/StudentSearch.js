import React, { useState } from 'react';

function StudentSearch() {
    // 假資料
    const dummyData = [
        { id: '1', name: 'Alice Chen', room: '101A', B_id: 'C202', contact: '0912345678' },
        { id: '2', name: 'Bob Lin', room: '102B', B_id: 'C203', contact: '0922345678' },
        { id: '3', name: 'Cathy Wang', room: '103C', B_id: 'C204', contact: '0932345678' },
        { id: '4', name: 'David Lee', room: '104D', B_id: 'C205', contact: '0942345678' },
        { id: '5', name: 'Emma Huang', room: '105E', B_id: 'C206', contact: '0952345678' },
    ];

    const [studentId, setStudentId] = useState('');
    const [B_id, setB_id] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    
        if (!studentId && !B_id) {
            setStudentData(null);
            setError('請至少輸入一個查詢條件');
            return;
        }
    
        let results = dummyData;
    
        // 如果兩個條件都存在，取交集
        if (studentId && B_id) {
            results = dummyData.filter(
                student => student.id === studentId && student.B_id === B_id
            );
        } else if (studentId) {
            // 只有 studentId
            results = dummyData.filter(
                student => student.id === studentId
            );
        } else if (B_id) {
            // 只有 B_id
            results = dummyData.filter(
                student => student.B_id === B_id
            );
        }
    
        if (results.length > 0) {
            setStudentData(results);
            setError('');
        } else {
            setStudentData(null);
            setError('找不到符合條件的學生');
        }
    };
    

    // 定義內嵌樣式
    const styles = {
        container: {
            marginTop: '20px',
            padding: '20px',
            maxWidth: '600px',
            margin: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            fontWeight: 'bold',
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
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        alert: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '10px',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginTop: '10px',
        },
        card: {
            marginTop: '15px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
        },
    };

    return (
        <div style={styles.container}>
            <h2>查詢學生資料</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <div style={styles.formGroup}>
                    <label htmlFor="studentId" style={styles.label}>學生 ID</label>
                    <input
                        type="text"
                        id="studentId"
                        style={styles.input}
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="請輸入學生 ID (可留空)"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="B_id" style={styles.label}>B_id</label>
                    <input
                        type="text"
                        id="B_id"
                        style={styles.input}
                        value={B_id}
                        onChange={(e) => setB_id(e.target.value)}
                        placeholder="請輸入 B_id (可留空)"
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    查詢
                </button>
            </form>

            {error && <div style={styles.alert}>{error}</div>}

            {studentData && studentData.map(student => (
                <div style={styles.card} key={student.id}>
                    <h5>學生資料</h5>
                    <p><strong>姓名：</strong>{student.name}</p>
                    <p><strong>學號：</strong>{student.id}</p>
                    <p><strong>宿舍號：</strong>{student.B_id}</p>
                    <p><strong>聯絡方式：</strong>{student.contact}</p>
                </div>
            ))}
        </div>
    );
}

export default StudentSearch;
