import React, { useState, useEffect } from 'react';

const Form1 = () => {
  const [pname, setPname] = useState('');
  const [isPnameFilled, setIsPnameFilled] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fadeIn effect after a short delay
    const timeout = setTimeout(() => {
      setShouldFadeIn(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (event) => {
    setPname(event.target.value);
    setIsPnameFilled(event.target.value.trim().length > 0);
  };

  const handleCreate = () => {
    alert(`Project created with name: ${pname}`); // Corrected string interpolation
    // You can perform any other action you want here
  };

  return (
    <div className={`w-full p-4 ${shouldFadeIn ? 'fade-in' : ''}`}> {/* Corrected className */}
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
        value={pname}
        onChange={handleChange}
        placeholder="Enter Project name"
      />
      {isPnameFilled && (
        <a href='nxt' >
        <button
          className="bg-green-500 hover:bg-green-200 text-white font-bold py-2 px-4 rounded-full mt-2 float-right"
          onClick={handleCreate}
        >
          Create
        </button>
        \</a>
      )}
    </div>
  );
};

export default Form1;
