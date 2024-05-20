import React, { useState, useEffect } from 'react';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import './update11.css';

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

function DisplayDatabase() {
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
  }, []);

  return (
    <div className="containerq">
      <h2 className="title">Crops Details</h2>
      <table className="table">
        <thead className="thead">
          <tr className="tr">
            <th className="th">Crop Name</th>
            <th className="th">Max Temperature</th>
            <th className="th">Min Temperature</th>
          </tr>
        </thead>
        <tbody>
          {database.map((crop, index) => (
            <tr className="tr" key={index}>
              <td className="td">{crop.cname}</td>
              <td className="td">{crop.maxtemp}</td>
              <td className="td">{crop.mintemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDatabase;
