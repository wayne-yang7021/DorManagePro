import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useMyContext } from "../context/context";

const FacilityMaintenanceForm = () => {
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { user } = useAuth();
    const { applyMaintenance, loading } = useMyContext();

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.ssn || !description.trim()) {
            console.error("No SSN or description");
            return;
        }

        try {
            const submitSuccess = await applyMaintenance(user.ssn, description.trim());
            if (submitSuccess) {
                setSubmitted(true);
                setDescription('');
            }
        } catch (error) {
            console.error("Submit failed", error);
        }
    };

    const handleNewRequest = () => {
        setSubmitted(false);
        setDescription('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.window}>
                <div style={styles.titleBar}>
                    <span style={styles.title}>Maintenance Request</span>
                </div>
                {!submitted ? (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Describe the maintenance issue in detail"
                            style={styles.textarea}
                            rows="5"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            style={styles.button}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                ) : (
                    <div style={styles.successContainer}>
                        <strong>Success!</strong> Your maintenance request has been submitted.
                        <button
                            onClick={handleNewRequest}
                            style={styles.button}
                        >
                            Submit Another Request
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Windows XP themed styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Tahoma, Geneva, sans-serif',
    },
    window: {
        width: '400px',
        backgroundColor: '#E1E1E1',
        border: '2px solid #5A5A5A',
        borderRadius: '4px',
        boxShadow: 'inset 1px 1px 8px rgba(255, 255, 255, 0.5), 4px 4px 10px rgba(0, 0, 0, 0.5)',
    },
    titleBar: {
        backgroundColor: '#6C6C6C',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '4px 10px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    form: {
        padding: '10px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #A5A5A5',
        borderRadius: '3px',
        boxSizing: 'border-box',
        marginBottom: '10px',
        resize: 'none',
    },
    button: {
      backgroundColor:'#e4e4e4',
      color: '#000',
      padding: '5px 10px',
      cursor: 'pointer',
      border: '1px solid #808080',
      boxShadow: 'inset 1px 1px 2px #f4f4f4, inset -1px -1px 2px #404040',
  },
  buttonHover: {
      backgroundColor: '#000080', // Dark blue on hover
      color: '#fff', // White text on hover
  },
    successContainer: {
        padding: '20px',
        textAlign: 'center',
        color: '#3C763D',
        backgroundColor: '#DFF0D8',
        border: '1px solid #3C763D',
        borderRadius: '3px',
    },
};

export default FacilityMaintenanceForm;