import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../components/adminlogin.css'

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      // Authenticate user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is an admin based on the hardcoded admin credentials
      const isAdmin = checkAdminCredentials(email, password);

      if (isAdmin) {
        // Redirect to admin dashboard
        navigate('/disp');
      } else {
        // Redirect to regular user dashboard
        navigate('/dh');
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };

  // Function to check if the user's credentials match the admin credentials
  const checkAdminCredentials = (email, password) => {
    // Hardcoded admin credentials
    const adminEmail = 'mldhanush03@gmail.com';
    const adminPassword = '1234567';

    // Check if the provided credentials match the admin credentials
    return email === adminEmail && password === adminPassword;
  };

  return (
    <div className="adbg min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 mb-4 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black text-base font-serif"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-3 mb-4 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-black text-base font-serif"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;