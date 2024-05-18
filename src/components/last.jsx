import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
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

const CropDescription = ({ cropNames }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDescriptions = async () => {
      const db = getFirestore();
      const cropsRef = collection(db, 'crops');
      const descriptionsArray = [];

      try {
        for (const cname of cropNames) {
          const q = query(cropsRef, where('cname', '==', cname));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              descriptionsArray.push({ cname, desc: doc.data().desc });
            });
          } else {
            descriptionsArray.push({ cname, desc: 'No description found for this crop.' });
          }
        }
        setDescriptions(descriptionsArray);
      } catch (error) {
        console.error('Error getting documents: ', error);
        setError('Error fetching crop descriptions.');
      }
    };

    fetchDescriptions();
  }, [cropNames]);

  return (
    <div>
      {error && <p>{error}</p>}
      {descriptions.map((crop, index) => (
        <div key={index}>
          <h2>{crop.cname}</h2>
          <p>{crop.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default CropDescription;
