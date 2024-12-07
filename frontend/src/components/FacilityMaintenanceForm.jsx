import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const FacilityMaintenanceForm = () => {
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();
  const { applyMaintenance, loading } = useMyContext();

  // Styles
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    label: {
      marginBottom: '5px',
      color: '#555',
      fontWeight: 'bold'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      minHeight: '100px',
      resize: 'vertical'
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      opacity: loading ? 0.5 : 1
    },
    successContainer: {
      backgroundColor: '#dff0d8',
      color: '#3c763d',
      padding: '15px',
      borderRadius: '4px',
      textAlign: 'center',
      marginBottom: '20px'
    },
    newRequestButton: {
      width: '100%',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '15px'
    }
  };

  // Handle the change in the description field
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validation check for SSN and description
    if (!user.ssn || !description.trim()) {
      console.error("No SSN or description");
      return;
    }

    // Call the applyMaintenance function and handle success or failure
    try {
      const submit_success = await applyMaintenance(user.ssn, description.trim());

      if (submit_success) {
        setSubmitted(true); // Set submitted state to true when the request is successful
        setDescription(''); // Clear the description field
      }
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  // Reset form to allow new submission
  const handleNewRequest = () => {
    setSubmitted(false);
    setDescription('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Facility Maintenance Request</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label 
              htmlFor="description" 
              style={styles.label}
            >
              What needs to be fixed?
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe the maintenance issue in detail"
              style={styles.textarea}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={styles.submitButton}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      ) : (
        <div>
          <div style={styles.successContainer}>
            <strong>Success! </strong>
            Your maintenance request has been submitted.
          </div>
          <button
            onClick={handleNewRequest}
            style={styles.newRequestButton}
          >
            Submit Another Request
          </button>
        </div>
      )}
    </div>
  );
};

export default FacilityMaintenanceForm;