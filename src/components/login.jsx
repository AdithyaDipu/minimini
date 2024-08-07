import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../components/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false); // State for tracking email sent status

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log('User signed in:', user);
      navigate('/dh');
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Set state to indicate email sent
      console.log('Password reset email sent');
    } catch (error) {
      setError(error.message);
      console.error('Password reset error:', error.message);
    }
  };

  return (
    <div className="bg3 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 text-black text-base font-serif"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 text-black text-base font-serif"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Sign In
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {resetEmailSent && <p className="text-green-500 text-center">Password reset email sent. Check your inbox.</p>} {/* Display email sent message */}
          <div className="text-center">
            <button onClick={handleForgotPassword} className="text-blue-500 hover:underline text-sm focus:outline-none">Forgot Password?</button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p>Don't have an account? <a href="/dev1" className="text-blue-500 hover:underline font-medium">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;