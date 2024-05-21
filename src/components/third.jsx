import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import '../components/third.css';
import Navbar from './navbar';

const Third = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="third-page-container-unique">
        <div className="next-page-unique">
          <div className="button-container-unique">
            {/* Use Link to navigate to the desired page */}
            <Link to='/crt'>
              <button className="styled-button-unique">CREATE PROJECT</button>
            </Link>
            <br/>
            <Link to='/mid'>
              <button className="styled-button-unique">EXISTING PROJECT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Third;
