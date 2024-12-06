import React, { useState } from 'react';

function StudentSearch() {
    // const [studentId, setStudentId] = useState('');
    // const [studentData, setStudentData] = useState(null);
    // const [error, setError] = useState('');

    // const handleSearch = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch(`/api/students/${studentId}`);
    //         if (!response.ok) {
    //             throw new Error('Student not found');
    //         }
    //         const data = await response.json();
    //         setStudentData(data);
    //         setError('');
    //     } catch (err) {
    //         setStudentData(null);
    //         setError(err.message);
    //     }
    // };
    // 假資料
    const dummyData = [
        { id: '1', name: 'Alice Chen', room: '101A', contact: '0912345678' },
        { id: '2', name: 'Bob Lin', room: '102B', contact: '0922345678' },
        { id: '3', name: 'Cathy Wang', room: '103C', contact: '0932345678' },
        { id: '4', name: 'David Lee', room: '104D', contact: '0942345678' },
        { id: '5', name: 'Emma Huang', room: '105E', contact: '0952345678' },
    ];

    const [studentId, setStudentId] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        // 從假資料中查詢
        const foundStudent = dummyData.find(student => student.id === studentId);
        if (foundStudent) {
            setStudentData(foundStudent);
            setError('');
        } else {
            setStudentData(null);
            setError('找不到該學生');
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
                        placeholder="請輸入學生 ID"
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

            {studentData && (
                <div style={styles.card}>
                    <h5>學生資料</h5>
                    <p><strong>姓名：</strong>{studentData.name}</p>
                    <p><strong>學號：</strong>{studentData.id}</p>
                    <p><strong>房號：</strong>{studentData.room}</p>
                    <p><strong>聯絡方式：</strong>{studentData.contact}</p>
                </div>
            )}
        </div>
    );
}

export default StudentSearch;
