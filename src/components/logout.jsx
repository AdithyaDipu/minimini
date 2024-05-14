// Logout.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleSignOut();
    navigate('/');
  }, [handleSignOut, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;