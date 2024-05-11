import React, { useState, useEffect } from 'react';
import Form1 from './form1'; // Assuming Form1 is in the same directory
import './four.css';
import Navbar from './navbar';

const Four = () => {
  // State variables to store button values
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fadeIn effect after a short delay
    const timeout = setTimeout(() => {
      setShouldFadeIn(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // onClick handlers for buttons
  const handleClick1 = () => {
    setValue1(1);
  };

  const handleClick2 = () => {
    setValue2(2);
  };

  const handleClick3 = () => {
    setValue3(3);
  };

  return (
    <div><Navbar></Navbar>
    <div className={`bg-image min-h-screen flex flex-col justify-between items-center ${shouldFadeIn ? 'fade-in' : ''}`}>
      <div className="p-4 lg shadow-lg w-64 md:w-96 mb-8">
        <Form1 />
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="bg-white w-304 h-75 flex items-center justify-between rounded-lg shadow-md border border-black mb-4">
          <p className="text-xl font-bold text-black">Water Level</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick1}>
            Scarce
          </button>
          <button className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick2}>
            Available
          </button>
          <button className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick3}>
            Plenty
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="bg-white w-304 h-75 flex items-center justify-between rounded-lg shadow-md border border-black mb-4">
          <p className="text-xl font-bold text-black">Availability of Sunlight</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick1}>
            Scarce
          </button>
          <button className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick2}>
            Available
          </button>
          <button className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick3}>
            Plenty
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white w-304 h-75 flex items-center justify-between rounded-lg shadow-md border border-black mb-4">
          <p className="text-xl font-bold text-black">Terrace Type</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick1}>
            Open
          </button>
          <button className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick2}>
            Closed
          </button>
          <button className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-4 rounded-full md:mx-2 mb-2 md:mb-0" onClick={handleClick3}>
            Greenhouse
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Four;
