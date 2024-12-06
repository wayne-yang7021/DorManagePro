import React, { createContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

// Create a Provider Component
const MyProvider = ({ children }) => {
    const [state, setState] = useState({
        // Define your state here
        user: null,
        isAuthenticated: false,
    });

    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook for using the context
const useMyContext = () => {
    return React.useContext(MyContext);
};

export { MyProvider, useMyContext };
