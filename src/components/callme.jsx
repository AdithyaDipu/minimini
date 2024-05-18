import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from '@firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Last from './last';

const YourParentComponent = () => {
  const [pname, setProjectName] = useState('');
  const [cname, setCropNames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCropNames = async () => {
      if (!pname) return;

      const db = initializeFirebase();
      const projRef = collection(db, 'proj');
      const q = query(projRef, where('pname', '==', pname));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const projectDoc = querySnapshot.docs[0];
          setCropNames(projectDoc.data().proj);
        } else {
          setError('No project found with that name.');
          setCropNames([]);
        }
      } catch (error) {
        console.error('Error getting documents: ', error);
        setError('Error fetching project data.');
      }
    };

    fetchCropNames();
  }, [pname]);

  const handleInputChange = (e) => {
    setProjectName(e.target.value);
  };

  const initializeFirebase = () => {
    // Your Firebase config
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

    const db = getFirestore();
    return db;
  };

  return (
    <div>
      <h1>Crop Descriptions</h1>
      <label>
        Enter Project Name:
        <input type="text" value={pname} onChange={handleInputChange} />
      </label>
      {error && <p>{error}</p>}
      {cname && cname.length > 0 && <Last cname={cname} />}

    </div>
  );
};

export default YourParentComponent;
