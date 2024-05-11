import React from 'react';
import '../components/cropdata.css';
import Navbar from './navbar';

// Sample crop data
const crops = [
  { name: 'Tomato', progress: 60 },
  { name: 'Brinjal', progress: 40 },
  { name: 'Carrot', progress: 80 },
];

function CropData() {
  // Function to generate CSS class based on crop name
  const getColorClass = (name) => {
    return name.toLowerCase(); // This assumes class names are exactly the crop names in lowercase
  };

  return (
    <div><Navbar></Navbar>
    <div className="App ugm">
      <h1>Crop Progress Tracker</h1>
      <div className="crop-container">
        {crops.map((crop, index) => (
          <div key={index} className="crop-card">
            <h2 className={getColorClass(crop.name)}>{crop.name}</h2>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: crop.progress + '%' }}
              ></div>
            </div>
            <p style={{ color: 'white' }}> {/* Set color to white here */}
              {crop.progress}% Complete
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default CropData;
