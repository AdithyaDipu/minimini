import React, { useState } from 'react';
import '../components/newlogin.css'
import Button from './button';
import Navbar from './navbar';
function Newlogin() {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
    <div><Navbar></Navbar>
    <div className="input flex flex-col space-y-4 bg4">
      <input
        type="text"
        name="input1"
        value={inputs.input1}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="First Name"
        
      />
      <input
        type="text"
        name="input2"
        value={inputs.input2}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="Last Name"
      />

      <input
        type="text"
        name="input3"
        value={inputs.input3}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="User Name"
      />
      <input
        type="text"
        name="input4"
        value={inputs.input4}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="Mobile Number"
      />
      <input
        type="text"
        name="input5"
        value={inputs.input5}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="City"
      />
      <input
        type="text"
        name="input6"
        value={inputs.input6}
        onChange={handleChange}
        className="px-4 py-2 bg-white text-black"
        placeholder="Password"
      />
      <Button/>
    </div>
    </div>
    </>
  );

}

export default Newlogin;