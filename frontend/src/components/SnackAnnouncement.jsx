import React, { useState } from 'react';

function SnackAnnouncement() {
    const [snacks, setSnacks] = useState([]); // Stores all snack items
    const [newSnacks, setNewSnacks] = useState(''); // Tracks the input for snack names
    const [error, setError] = useState('');

    const handleAddSnacks = (e) => {
        e.preventDefault();

        // Validate input
        if (!newSnacks.trim()) {
            setError('Please enter at least one snack name.');
            return;
        }

        // Split input snack names by commas
        const snacksToAdd = newSnacks
            .split(',')
            .map(snack => snack.trim()) // Trim whitespace
            .filter(snack => snack); // Avoid empty entries

        if (snacksToAdd.length === 0) {
            setError('Please enter valid snack names.');
            return;
        }

        // Add to existing snack list
        setSnacks([...snacks, ...snacksToAdd]);
        setNewSnacks(''); // Clear input field
        setError('');
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

            <h3>Snack Announcements</h3>
            <ul style={styles.list}>
                {snacks.map((snack, index) => (
                    <li key={index} style={styles.listItem}>
                        {snack}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SnackAnnouncement;
