import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

const DormTransferApplication = () => {
  const { user } = useAuth();
  const { applications } = useMyContext();
  const [applicationReason, setApplicationReason] = useState('');

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    // TODO: Implement application submission logic
    console.log('Submitting application');
  };



  return (
    <div className="reservation-container">
      <h1>Dorm Transfer Application</h1>
      
      <div className="transfer-application-wrapper">
        <form onSubmit={handleSubmitApplication} className="transfer-form">
          <div className="form-group">
            <label htmlFor="transferReason">Reason for Transfer</label>
            <textarea
              id="transferReason"
              value={applicationReason}
              onChange={(e) => setApplicationReason(e.target.value)}
              placeholder="Explain your reason for requesting a dorm transfer"
              required
              className="transfer-textarea"
            />
          </div>
          
          <button type="submit" className="submit-application-btn">
            Submit Transfer Application
          </button>
        </form>

        <div className="previous-applications">
          <h2>Your Previous Applications</h2>
          {applications.length === 0 ? (
            <p className="no-applications">No previous dorm transfer applications found.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>dormId</th>
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