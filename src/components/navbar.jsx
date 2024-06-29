// Navbar.jsx
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Terralogo.png';
import '../components/navbar.css';
import useAuth from '../components/useAuth'; // Import the useAuth hook

const Navbar = () => {
  const { isAuthenticated, currentUser } = useAuth(); // Destructure isAuthenticated and user from useAuth
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleContactClick = () => {
    setShowContactPopup(!showContactPopup);
  };
  return (
    <nav className="bg-black p-4 relative">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 mr-2" />
          </Link>
          <Link to="/">
            <div className="text-white text-xl font-bold hell">TERRA FARM <br />ASSIST</div>
          </Link>
        </div>
        <ul className="flex">
          <li className="mr-6">
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          </li>
          <li className="mr-6">
            <button onClick={handleContactClick} className="text-white hover:text-gray-300">Contact</button>
            {showContactPopup && (
              <div className="contact-popup absolute bg-white border border-gray-300 p-2">
                {/* Add your contact information here */}
                Contact us at: +1234567890<br/>
                mail id : adithyadip77@gmail.com
              </div>
            )}
          </li>
          {isAuthenticated ? (
            <li className="mr-6">
              <Link to="/logout" className="text-white hover:text-gray-300">Sign Out</Link>
            </li>
          ) : (
            <li className="mr-6">
              <Link to="/login" className="text-white hover:text-gray-300">Login/Signup</Link>
            </li>
          )}
          {/* Render admin login button or user's email based on authentication */}
          {isAuthenticated ? (
            <li className="mr-6">
              <span className="text-white hover:text-gray-300">{currentUser.email}</span>
            </li>
          ) : (
            <li className="mr-6">
              <Link to="/admin" className="text-white hover:text-gray-300">Admin Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;