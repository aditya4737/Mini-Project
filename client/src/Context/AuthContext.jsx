import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    dbId: '',
  });

 
  // Function to log in and set user data
  const login = (username, email, dbId) => {    
    setUser({ username, email, dbId });
  };

  // Function to log out and clear user data
  const logout = () => {
    setUser({ username: '', email: '', dbId: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
