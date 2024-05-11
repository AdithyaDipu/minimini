// Third.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import '../components/third.css';
import Navbar from './navbar';

const Third = () => {
  return (
    <div>
      <Navbar></Navbar>
    <div className="third-page-container">
      <div className="next-page">
        <div className="button-container">
          {/* Use Link to navigate to the desired page */}
          <a  href='crt' >
          <button className="button"  >CREATE PROJECT</button>
          </a>
          <br/>
          <a href='mid'>
          <button className="button"  >EXISTING PROJECT</button>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Third;
