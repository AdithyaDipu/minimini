// first.jsx
import React from 'react';
import Navbar from './navbar';
import leftImage from '../assets/imgg.jpg';
import rightImage from '../assets/img.jpg';
import '../components/first.css';

const First = () => {
  return (
   <div>
    <Navbar></Navbar>
    <div className="first-page-container">
      <div className="image-content-container">
        {/* Left image with text */}
        <div className="image-content-item">
          <img src={leftImage} alt="Left Image" />
          <p className='imgt'><u>WHAT IS ROOF TOP FARMING?</u><br/>
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
    </div>
    </div>
  );
};

export default First;
