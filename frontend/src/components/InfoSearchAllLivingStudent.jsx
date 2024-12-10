import React, { useState } from 'react';
import { useAuth } from "../context/authContext";

function InfoSearchAllLivingStudent() {
    const { admin } = useAuth();
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8888/api/admin/all_living_student_search?dorm_id=${admin.dormId}`
            );

            if (!response.ok) {
                throw new Error('Student not found');
            }

            const data = await response.json();
            setStudentData(data);
            setError('');
        } catch (err) {
            setStudentData(null);
            setError(err.message || 'An error occurred');
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '900px',
            margin: '20px auto',
            borderRadius: '10px',
            backgroundColor: '#f5f7fa',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
        button: {
            marginTop: '10px',
            marginBottom: '10px',
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        alert: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '10px',
            border: '1px solid #f5c6cb',
            borderRadius: '5px',
            marginTop: '10px',
            textAlign: 'center',
        },
        scrollContainer: {
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        card: {
            marginBottom: '15px',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        cardHeader: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#555',
        },
        cardText: {
            margin: '5px 0',
            fontSize: '14px',
            color: '#666',
        },
    };

    return (
        <div style={styles.container}>
            {admin && <h2 style={styles.header}>All Students in Dorm {admin.dormId}</h2>}
            {studentData && <h3 style={styles.header}>Total {studentData.length} Students in this Dorm </h3>}
            <form onSubmit={handleSearch} style={{ textAlign: 'center' }}>
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

            {studentData && (
                <div style={styles.scrollContainer}>
                    {studentData.map((student) => (
                        <div style={styles.card} key={student.studentId}>
                            <div style={styles.cardHeader}>Student Details</div>
                            <p style={styles.cardText}><strong>Student ID:</strong> {student.studentId}</p>
                            <p style={styles.cardText}><strong>Bed:</strong> {student.bId}</p>
                            <p style={styles.cardText}><strong>Due Date:</strong> {student.dueDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InfoSearchAllLivingStudent;
