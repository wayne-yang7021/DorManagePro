import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const BedTransferApplication = () => {
  const { user } = useAuth();
  const { applications } = useMyContext();
  const [selectedBed, setSelectedBed] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleBedSelection = (bedId) => {
    setSelectedBed(bedId === selectedBed ? null : bedId); // Deselect if already selected
  };


  const dormData = [
    { dorm_id: 'DORM02', b_id: '111A' },
    { dorm_id: 'DORM02', b_id: '222B' },
    { dorm_id: 'DORM02', b_id: '333C' },
    { dorm_id: 'DORM02', b_id: '444D' },
  ];

//   const emptyBedSearch = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await fetch(
//             `http://localhost:8888/api/admin/student_search?student_id=${studentId}&dorm_id=${admin.dorm_id}`
//         );
        
//         if (!response.ok) {
//             throw new Error('Student not found');
//         }

//         const data = await response.json();
//         setStudentData([data]); // 包裝成陣列以便渲染
//         setError('');
//     } catch (err) {
//         setStudentData(null);
//         setError(err.message || 'An error occurred');
//     }
// };

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

    // Do bed transfer update
    setError(null);
    try {
      const response = await fetch(`http://localhost:8888/api/user/bed_transfer_update`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            ssn: user.ssn, 
            fmove_in_bed: selectedBed
          }),
      });

      if (!response.ok) {
          throw new Error('Failed to update application.');
      }
    } catch (err) {
        console.error('Error updating application:', err);
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
              {dormData.map((bed) => (
                <div
                  key={bed.b_id}
                  style={{
                    border: selectedBed === bed.b_id ? '2px solid #4CAF50' : '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    backgroundColor: selectedBed === bed.b_id ? '#f9fff9' : '#fff',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleBedSelection(bed.b_id)}
                >
                  <h3 style={{ margin: '0 0 10px', color: '#333' }}>{bed.b_id}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default BedTransferApplication;
