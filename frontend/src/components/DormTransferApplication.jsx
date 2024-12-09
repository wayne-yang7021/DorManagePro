import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const DormTransferApplication = () => {
  const { user } = useAuth();
  const { applications } = useMyContext();
  const [applicationReason, setApplicationReason] = useState('');
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleDormSelection = (dormId) => {
    setSelectedDorm(dormId === selectedDorm ? null : dormId); // Deselect if already selected
  };

  const dormData = [
    { dorm_id: 'DORM01', name: '男一舍' },
    { dorm_id: 'DORM02', name: '男二舍' },
    { dorm_id: 'DORM03', name: '男三舍' },
    { dorm_id: 'DORM04', name: '男四舍' },
    { dorm_id: 'DORM05', name: '男五舍' },
  ];

  const handleSubmitApplication = async () => {
    if (!selectedDorm) {
      setError('Please select a dorm to proceed.');
      return;
    }
    setError(null);
    console.log(user.ssn);
    try {
      const response = await fetch('http://localhost:8888/api/user/dorm_change_request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ssn: user.ssn, move_to: selectedDorm, semester: '111-1' }),
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
      <h1>Dorm Transfer Application</h1>

      <div className="transfer-application-wrapper">
        {applicationSubmitted ? (
          <div style={{ color: 'green', textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
            Application submitted successfully!
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', color: '#555' }}>Select the dorm you wish to transfer to:</p>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              {dormData.map((dorm) => (
                <div
                  key={dorm.dorm_id}
                  style={{
                    border: selectedDorm === dorm.dorm_id ? '2px solid #4CAF50' : '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: selectedDorm === dorm.dorm_id ? '#f9fff9' : '#fff',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleDormSelection(dorm.dorm_id)}
                >
                  <h3 style={{ margin: '0 0 10px', color: '#333' }}>{dorm.name}</h3>
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

        <div className="previous-applications">
          <h2>Your Previous Applications</h2>
          {applications.length === 0 ? (
            <p className="no-applications">No previous dorm transfer applications found.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Dorm ID</th>
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
        </div>
      </div>
    </div>
  );
};

export default DormTransferApplication;