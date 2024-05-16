import React, { useState, useEffect } from 'react';
import { addDoc, collection, getFirestore, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// Firebase configuration
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

function AddField() {
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [cityName, setCityName] = useState('');
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'crops'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setDatabase(data);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, [app]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, 'crops'), {
        maxtemp: parseFloat(maxTemp),
        mintemp: parseFloat(minTemp),
        cname: cityName
      });

      console.log("Data successfully written to Firestore!");
      setMaxTemp('');
      setMinTemp('');
      setCityName('');
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <h2>Add Crop Data</h2>
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
      <h2>Database</h2>
      <table>
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Max Temperature</th>
            <th>Min Temperature</th>
          </tr>
        </thead>
        <tbody>
          {database.map((crop, index) => (
            <tr key={index}>
              <td>{crop.cname}</td>
              <td>{crop.maxtemp}</td>
              <td>{crop.mintemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddField;
