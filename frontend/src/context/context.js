import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './authContext';

// Create a Context
const MyContext = createContext();

// Create a Provider Component
const MyProvider = ({ children }) => {
    const [state, setState] = useState({
        // Define your state here
        user: null,
        isAuthenticated: false,
    });

    const { user } = useAuth();
    const [ snackOption, setSnackOption ] = useState([]);

    useEffect(() => {
        getSnackOption();
    },[user])

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
          console.log("Data from backend:", data); // Ensure this logs an array
          setSnackOption(data); // Update the state
          console.log("State updated to:", snackOption); // State after update (might be delayed)
        } catch (err) {
          console.error(err.message);
        }
      };

    return (
        <MyContext.Provider value={{ snackOption, getSnackOption }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook for using the context
const useMyContext = () => {
    return React.useContext(MyContext);
};

export { MyProvider, useMyContext };
