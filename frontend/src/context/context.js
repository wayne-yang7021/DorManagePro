import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './authContext';

// Create a Context
const MyContext = createContext();

// Create a Provider Component
const MyProvider = ({ children }) => {
    const { user } = useAuth();
    const [ snackOption, setSnackOption ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [applications, setApplications] = useState([]);
    const [posts, setPosts] = useState([]);


    useEffect(() => {
      if(user){
        getSnackOption();
        getAllFacility();
        getApplications();
        getPosts();
      }
    },[user])

    const applyMaintenance = async (ssn, description) => {
      setLoading(true);
      setError('');
      setSuccess('');
  
      try {
        const response = await fetch('http://localhost:8888/api/user/maintenance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ssn, description }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setSuccess('Maintenance request submitted successfully');
          console.log(success)
        } else {
          setError(result.message || 'Failed to submit the request');
          setLoading(false)
          console.log(error)
          return false
        }
      } catch (error) {
        setError('Error submitting request');
        setLoading(false)
        return false
      } finally {
        setLoading(false);
      }
      return true;

    };

    const getApplications = async () => {
      try {
        const response = await fetch(`http://localhost:8888/api/user/transfer_application?student_ssn=${user?.ssn}`);
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch applications');
        }
    
        const applications = await response.json();
        console.log('Applications fetched:', applications);
        setApplications(applications);
      } catch (err) {
        console.error('Error fetching applications:', err.message);
      }
    };

    const getSnackOption = async () => {
        try {
          const response = await fetch(
            `http://localhost:8888/api/user/snack_options?dormId=${user.dormId}&semester=${"111-2"}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          setSnackOption(data); // Update the state
        } catch (err) {
          console.error(err.message);
        }
      };

      const getAllFacility = async () => {
        try {
          const response = await fetch(`http://localhost:8888/api/dorm/dorm_facility?dormId=${user.dormId}`);
          const data = await response.json()
          setFacilities(data);
        } catch (error) {
          console.error('Error fetching facilities:', error);
        }
      };

      // const getReservedFacility = async () => {
      //   try {
      //     const response = await fetch(`http://localhost:8888/api/user/dorm_facility?dormId=${user.dormId}`);
      //     const data = await response.json()
      //     setFacilities(data);
      //   } catch (error) {
      //     console.error('Error fetching facilities:', error);
      //   }
      // };

      const getPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8888/api/user/get_post_list?dorm_id=${user.dormId}`);

            if (!response.ok) {
                throw new Error('Request not found');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setPosts([])
            console.log("Failed to get post: ", error.message)
        }
    }


    return (
        <MyContext.Provider value={{ snackOption, getSnackOption, applyMaintenance, loading, facilities, getAllFacility, getPosts, posts, applications }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook for using the context
const useMyContext = () => {
    return React.useContext(MyContext);
};

export { MyProvider, useMyContext };
