// useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Assuming you already have AuthContext.js

const useAuth = () => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  return {
    currentUser,
    isAuthenticated,
  };
};

export default useAuth;