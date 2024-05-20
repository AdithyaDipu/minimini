import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import leftImage from '../assets/imgg.jpg';
import rightImage from '../assets/img.jpg';
import { AuthContext } from './AuthContext'; // Assuming you have an AuthContext
import '../components/first.css';

const First = () => {
  const { currentUser } = useContext(AuthContext); // Access the current user's authentication status
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dh'); // Navigate to the third page
  };

  return (
    <div>
      <Navbar />
      <div className="first-page-container">
        <div className="image-content-container">
          {/* Left image with text */}
          <div className="image-content-item">
            <img src={leftImage} alt="Left Image" />
            <p className='imgt '><u>WHAT IS ROOF TOP FARMING?</u><br/>
            <br/>
            Rooftop farming, also known as rooftop gardening or urban rooftop agriculture<br/>
            , is the practice of cultivating plants on the roof of buildings. This form of<br/>
            agriculture has gained popularity in urban areas where land for traditional <br/>
            farming is scarce or expensive.</p>
          </div>

          <div className="image-content-item">
            <img src={rightImage} alt="Right Image" />
            <p className='imgt'><u>WHY ROOF TOP FARMING SHOULD BE ENCOURAGED</u><br/>
            <br/>
            Encouraging rooftop farming offers numerous benefits, making it a <br/>
            compelling option for urban areas. Rooftops often remain unused or <br/>
            underutilized in urban areas. By converting them into productive spaces<br/> 
            for agriculture, cities can make efficient use of available land resources.</p>
          </div>
        </div>
        {currentUser && (
          <div className="text-center mt-6">
            <button
              onClick={handleNavigate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Projects
            </button>
          </div>
        )}
        <div className="text-center mt-6">
          <a
            href="/feed"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Feedback
          </a>
        </div>
      </div>
    </div>
  );
};

export default First;