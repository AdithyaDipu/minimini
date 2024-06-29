// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize Firebase Authentication
  const auth = getAuth();

  // Check if user is authenticated on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    // Unsubscribe from the auth state listener when component unmounts
    return () => unsubscribe();
  }, [auth]);

  // Sign out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error('Sign out error:', error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};