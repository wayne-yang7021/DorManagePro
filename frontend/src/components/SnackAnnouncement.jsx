import React, { useState } from 'react';
import { useAuth } from "../context/authContext";

function SnackAnnouncement() {
    const {admin} = useAuth()
    const [newSnacks, setNewSnacks] = useState(''); // Tracks the input for snack names
    const [semester, setSemester] = useState(''); // Tracks the input for semester
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const ssn = 'a12345678'
    const handleAddSnacks = async (e) => {
        e.preventDefault();

        // Validate input
        if (!semester.trim()) {
            setError('Please enter semester.');
            return;
        }

        if (!newSnacks.trim()) {
            setError('Please enter at least one snack name.');
            return;
        }

        // Split input snack names by commas
        const snacksToAdd = newSnacks
            .split(',')
            .map(snack => snack.trim())
            .filter(snack => snack);

        if (snacksToAdd.length === 0) {
            setError('Please enter valid snack names.');
            return;
        }

        try {
            // Send POST request to the backend
            for (const snackToAdd of snacksToAdd) {
                const response = await fetch('http://localhost:8888/api/admin/snack_announcement', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ssn: admin.ssn,
                        semester: semester,
                        dorm_id: admin.dorm_id,
                        snack_name: snackToAdd,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to announce snack: ' + snackToAdd);
                }
            }

            // Update local state and reset form
            // setSnacks([...snacks, ...snacksToAdd]);
            setNewSnacks('');
            setError('');
            setSuccess('Snack announcement created successfully!');
        } catch (err) {
            setError(err.message || 'An error occurred');
            setSuccess('');
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
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#218838',
        },
        alert: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            padding: '10px',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginTop: '10px',
        },
        success: {
            color: '#155724',
            backgroundColor: '#d4edda',
            padding: '10px',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginTop: '10px',
        },
        list: {
            listStyleType: 'none',
            paddingLeft: 0,
            marginTop: '15px',
        },
        listItem: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Add Snack Announcement</h2>
            <form onSubmit={handleAddSnacks}>
                <div style={styles.formGroup}>
                    <label htmlFor="semester">Semester</label>
                    <input
                        type="text"
                        id="semester"
                        style={styles.input}
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="Enter semester, e.g., 112-1"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="snackInput">Snack Names (separate with commas)</label>
                    <input
                        type="text"
                        id="snackInput"
                        style={styles.input}
                        value={newSnacks}
                        onChange={(e) => setNewSnacks(e.target.value)}
                        placeholder="Enter snack names, e.g., Milk, Sandwich, Chips"
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add
                </button>
            </form>

            {error && <div style={styles.alert}>{error}</div>}
            {success && <div style={styles.success}>{success}</div>}
        </div>
    );
}

export default SnackAnnouncement;
