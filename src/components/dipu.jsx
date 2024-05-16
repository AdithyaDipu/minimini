import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const CropList = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("crops").onSnapshot(snapshot => {
      const cropsData = [];
      snapshot.forEach(doc => {
        cropsData.push({ id: doc.id, ...doc.data() });
      });
      setCrops(cropsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Crops List</h2>
      <ul>
        {crops.map(crop => (
          <li key={crop.id}>
            <strong>Crop Name:</strong> {crop.cname}, 
            <strong> Min Temp:</strong> {crop.mintemp}, 
            <strong> Max Temp:</strong> {crop.maxtemp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropList;
