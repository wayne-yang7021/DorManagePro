import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const BedTransferApplication = () => {
  const { user, loading } = useAuth();
  const [emptyBed, setEmptyBed] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleBedSelection = (bedId) => {
    setSelectedBed(bedId === selectedBed ? null : bedId); // Deselect if already selected
  };

  const emptyBedSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/dorm/get_empty_bed_in_room?dorm_id=${user.dormId}`
      );
      
      if (!response.ok) {
        throw new Error('Student not found');
      }

      const data = await response.json();
      setEmptyBed(data);
      setError('');
    } catch (err) {
      setEmptyBed(null);
      setError(err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (user) {
      emptyBedSearch(); // Execute on page load
    }
  }, [user]); // Ensure dormId is available and triggers when it changes

  const handleSubmitApplication = async () => {
    if (!selectedBed) {
      setError('Please select a bed to proceed.');
      return;
    }
    setError(null);
    try {
      const response = await fetch('http://localhost:8888/api/user/bed_transfer_request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ssn: user.ssn,
          move_in_bed: selectedBed,
          original_bed: user.bId,
          semester: '113-1',
          dorm_id: user.dormId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application.');
      }

      setApplicationSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reservation-container" style={styles.container}>
      <h1 style={styles.header}>Bed Transfer Application</h1>

      <div className="transfer-application-wrapper" style={styles.wrapper}>
        {applicationSubmitted ? (
          <div style={styles.successMessage}>Application submitted successfully!</div>
        ) : (
          <>
            <p style={styles.instruction}>Select the bed you wish to transfer to:</p>
            {error && <p style={styles.errorMessage}>{error}</p>}
            <div style={styles.bedGrid}>
              {emptyBed && emptyBed.map((bed) => (
                <div
                  key={bed.bId}
                  style={{
                    ...styles.bedItem,
                    border: selectedBed === bed.bId ? '2px solid black' : '1px solid #ccc',
                    backgroundColor: selectedBed === bed.bId ? 'gray' : '#fff',
                  }}
                  onClick={() => handleBedSelection(bed.bId)}
                >
                  <h3 style={styles.bedId}>{bed.bId}</h3>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitApplication}
              style={styles.submitButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
            >
              Submit Application
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#c0c0c0',
    border: '2px solid #000',
    borderRadius: '5px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    backgroundColor: '#e5e5e5',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#000',
    fontWeight: 'bold',
  },
  wrapper: {
    marginTop: '20px',
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
  },
  instruction: {
    textAlign: 'center',
    color: '#555',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  bedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '10px',
  },
  bedItem: {
    borderRadius: '8px',
    padding: '15px',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'all 0.3s ease',
  },
  bedId: {
    margin: '0 0 10px',
    color: '#333',
    fontSize: '18px',
  },

  submitButton: {
    backgroundColor: '#c3c7cb',
    color: '#000',
    width: 'max-width',
    padding: '5px 10px',
    border: '2px outset #c3c7cb',
    cursor: 'pointer',
    boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white',
  },
};

export default BedTransferApplication;