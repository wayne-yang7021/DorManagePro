import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './authContext';
import { admin } from '../../../backend/models/schema';

// Create a Context
const adminContext = createContext();

// Create a Provider Component
const adminProvider = ({ children }) => {
    const [state, setState] = useState({
        // Define your state here
        admin: null,
        isAuthenticated: false,
    });

    const { admin } = useAuth();
    // const [ maintenanceStatus, setMaintenanceStatus ] = useState([]);


    useEffect(() => {
        // getMaintenanceStatus();
        console.log({maintenanceStatus})
    },[admin])

    // const getMaintenanceStatus = async () => {
    //     try {
    //       const response = await fetch(
    //         `http://localhost:8888/api/admin/maintenance_status?dormId=${admin.dorm_id}`,
    //         {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           }
    //         }
    //       );
      
    //       if (!response.ok) {
    //         throw new Error(`Error: ${response.status}`);
    //       }
      
    //       const data = await response.json();
    //       setMaintenanceStatus(data); // Update the state
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   };

    //   const getAllFacility = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:8888/api/dorm/dorm_facility?dormId=${user.dormId}`);
    //       const data = await response.json()
    //       setFacilities(data);
    //     } catch (error) {
    //       console.error('Error fetching facilities:', error);
    //     }
    //   };

    //   const applyMaintenance = async (ssn, description) => {
    //     setLoading(true);
    //     setError('');
    //     setSuccess('');
    
    //     try {
    //       const response = await fetch('http://localhost:8888/api/user/maintenance', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ ssn, description }),
    //       });
    
    //       const result = await response.json();
    
    //       if (response.ok) {
    //         setSuccess('Maintenance request submitted successfully');
    //       } else {
    //         setError(result.message || 'Failed to submit the request');
    //         setLoading(false)
    //         return false
    //       }
    //     } catch (error) {
    //       setError('Error submitting request');
    //       setLoading(false)
    //       return false
    //     } finally {
    //       setLoading(false);
    //     }
    //     return true;
  
    //   };

    return (
        <adminContext.Provider value={{ }}>
            {children}
        </adminContext.Provider>
    );
};

// Custom hook for using the context
const useAdminContext = () => {
    return React.useContext(adminContext);
};

export { adminProvider, useAdminContext };
