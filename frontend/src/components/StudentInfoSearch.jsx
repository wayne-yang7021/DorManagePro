import React, { useState } from 'react';

function StudentInfoSearch() {
    const dummyData = [
        { id: '1', name: 'Alice Chen', room: '202', B_id: '202C', contact: '0912345678' },
        { id: '2', name: 'Bob Lin', room: '203', B_id: '203C', contact: '0922345678' },
        { id: '3', name: 'Cathy Wang', room: '204', B_id: '204C', contact: '0932345678' },
        { id: '4', name: 'David Lee', room: '205', B_id: '205C', contact: '0942345678' },
        { id: '5', name: 'Emma Huang', room: '206', B_id: '206C', contact: '0952345678' },
        { id: '6', name: 'Howard Pang', room: '206', B_id: '206D', contact: '0952345678' },
    ];

    const [studentId, setStudentId] = useState('');
    const [B_id, setB_id] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    
        if (!studentId && !B_id) {
            setStudentData(null);
            setError('Please enter at least one search condition.');
            return;
        }
    
        let results = dummyData;
    
        if (studentId && B_id) {
            results = dummyData.filter(
                student => student.id === studentId && student.B_id === B_id
            );
        } else if (studentId) {
            results = dummyData.filter(
                student => student.id === studentId
            );
        } else if (B_id) {
            results = dummyData.filter(
                student => student.B_id === B_id
            );
        }
    
        if (results.length > 0) {
            setStudentData(results);
            setError('');
        } else {
            setStudentData(null);
            setError('No matching student found.');
        }
    };

    const styles = {
        container: {
            padding: '20px',
            width: '600px',
            maxWidth: '800px',
            margin: '20px auto',
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
            <h2>Search Student Information</h2>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <div style={styles.formGroup}>
                    <label htmlFor="studentId" style={styles.label}>Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        style={styles.input}
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter Student ID (optional)"
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
                        placeholder="Enter B_id (optional)"
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Search
                </button>
            </form>

            {error && <div style={styles.alert}>{error}</div>}

            {studentData && studentData.map(student => (
                <div style={styles.card} key={student.id}>
                    <h5>Student Details</h5>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Student ID:</strong> {student.id}</p>
                    <p><strong>Room:</strong> {student.room}</p>
                    <p><strong>B_id:</strong> {student.B_id}</p>
                    <p><strong>Contact:</strong> {student.contact}</p>
                </div>
            ))}
        </div>
    );
}

export default StudentInfoSearch;
