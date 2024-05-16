import React, { useState } from 'react';
import { collection, addDoc, getFirestore, query, where, getDocs } from '@firebase/firestore';


// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

const CropSearch = () => {
  const [cropName, setCropName] = useState('');
  const [cropDesc, setCropDesc] = useState('');

  const handleInputChange = (e) => {
    setCropName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();

    try {
      // Add a document to the 'crops' collection with the entered crop name and description
      await addDoc(collection(db, 'crops'), {
        name: cropName,
        desc: cropDesc
      });
      alert('Crop added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleSearch = async () => {
    const db = getFirestore();

    try {
      // Query the 'crops' collection to find the crop with the entered name
      const q = query(collection(db, 'crops'), where('name', '==', cropName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCropDesc(doc.data().desc);
      });
    } catch (error) {
      console.error('Error searching for crop: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Crop Name:
          <input type="text" value={cropName} onChange={handleInputChange} />
        </label>
        <label>
          Enter Crop Description:
          <input type="text" value={cropDesc} onChange={(e) => setCropDesc(e.target.value)} />
        </label>
        <button type="submit">Add Crop</button>
      </form>
      <button onClick={handleSearch}>Search Crop Description</button>
      {cropDesc && (
        <div>
          <h2>Description:</h2>
          <p>{cropDesc}</p>
        </div>
      )}
    </div>
  );
};

export default CropSearch;
