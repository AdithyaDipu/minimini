import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvl2v1enygI1jplM_denVHnwZLA3omV40",
  authDomain: "minimini-9d35a.firebaseapp.com",
  databaseURL: "https://minimini-9d35a-default-rtdb.firebaseio.com",
  projectId: "minimini-9d35a",
  storageBucket: "minimini-9d35a.appspot.com",
  messagingSenderId: "1072638438233",
  appId: "1:1072638438233:web:cec47e175f4945abb17a48",
  measurementId: "G-NV7ZSQ0Y5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function WeatherForm() {
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add data to Firestore collection 'crops'
      await addDoc(collection(db, 'crops'), {
        maxtemp: parseFloat(maxTemp), // Convert to number
        mintemp: parseFloat(minTemp), // Convert to number
        cname: cityName
      });

      console.log("Data successfully written to Firestore!");
      // Clear input fields after successful submission
      setMaxTemp('');
      setMinTemp('');
      setCityName('');
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Max Temperature:
          <input
            type="number"
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Min Temperature:
          <input
            type="number"
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Crop Name:
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WeatherForm;