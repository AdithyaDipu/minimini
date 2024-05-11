import React, { useState } from 'react';
import logo from '../assets/Terralogo.png'; // Import your logo image file

const Navbar = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleContactClick = () => {
    setShowContactPopup(!showContactPopup);
  };

  return (
    <nav className="bg-black p-4 relative"> {/* Set relative positioning for the nav container */}
      <div className="container mx-auto flex justify-between items-center relative"> {/* Set relative positioning for the inner container */}
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <img src={logo} alt="Logo" className="h-8 mr-2" /> {/* Adjust the height and margin as needed */}
          </a>
          <a href="/">
            <div className="text-white text-xl font-bold hell">TERRA FARM <br />ASSIST</div>
          </a>
        </div>

        {/* Navbar links */}
        <ul className="flex">
          <li className="mr-6">
            <a href="about" className="text-white hover:text-gray-300">About</a>
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
          <li className="mr-6">
            <a href="login" className="text-white hover:text-gray-300">login/signup</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;