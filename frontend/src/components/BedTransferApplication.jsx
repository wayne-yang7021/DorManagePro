import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const BedTransferApplication = () => {
  const { user, loading } = useAuth();
  // const { applications } = useMyContext();
  const [emptyBed, setEmptyBed] = useState([])
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
    if (user.dormId) {
        emptyBedSearch(); // 頁面載入時自動執行
    }
}, [user.dormId]); // 確保 dormId 存在且變化時執行

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
          dorm_id: user.dormId
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
    <div className="reservation-container">
      <h1>Bed Transfer Application</h1>

      <div className="transfer-application-wrapper">
        {applicationSubmitted ? (
          <div style={{ color: 'green', textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
            Application submitted successfully!
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', color: '#555' }}>Select the bed you wish to transfer to:</p>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              {emptyBed && emptyBed.map((bed) => (
                <div
                  key={bed.bId}
                  style={{
                    border: selectedBed === bed.bId ? '2px solid #4CAF50' : '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: selectedBed === bed.bId ? '#f9fff9' : '#fff',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleBedSelection(bed.bId)}
                >
                  <h3 style={{ margin: '0 0 10px', color: '#333' }}>{bed.bId}</h3>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmitApplication}
              style={{
                marginTop: '30px',
                padding: '12px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                width: '100%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
            >
              Submit Application
            </button>
          </>
        )}

        {/* <div className="previous-applications">
          <h2>Your Previous Applications</h2>
          {applications.length === 0 ? (
            <p className="no-applications">No previous bed transfer applications found.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bed ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.apply_id}>
                    <td>{new Date(application.applyTime).toLocaleDateString()}</td>
                    <td>{application.dormId}</td>
                    <td>{application.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div> */}

      </div>
    </div>
  );
};

export default BedTransferApplication;
