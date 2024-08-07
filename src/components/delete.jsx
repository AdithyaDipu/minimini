import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './delete.css'

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
export const db = getFirestore(app);

function WeatherForm() {
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [cityName, setCityName] = useState('');
  const [desc, setDesc] = useState(''); // New state for description
  const [deleteCname, setDeleteCname] = useState(''); // New state for crop name to delete

  const navigate = useNavigate(); // Get navigate function from useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add data to Firestore collection 'crops'
      await addDoc(collection(db, 'crops'), {
        maxtemp: parseFloat(maxTemp), // Convert to number
        mintemp: parseFloat(minTemp), // Convert to number
        cname: cityName,
        desc: desc // Add desc field
      });

      alert("Data successfully written to Firestore!");
      // Clear input fields after successful submission
      setMaxTemp('');
      setMinTemp('');
      setCityName('');
      setDesc(''); // Clear desc field
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Query the Firestore collection 'crops' for documents with the specified cname
      const q = query(collection(db, 'crops'), where("cname", "==", deleteCname));
      const querySnapshot = await getDocs(q);

      // Delete each document that matches the query
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, 'crops', docSnapshot.id));
      });

      console.log("Documents successfully deleted!");
      // Clear the cname field after successful deletion
      setDeleteCname('');
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  };

  return (
    <div className='bgg2'>
      <div className="weather-form-container1">
        <div className="form-section1">
          <h2 className='rf'>Add Crop Data</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='lab22'>
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
            <div>
              <label>
                Description:
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </label>
            </div>
            <button className='b1' type="submit">Submit</button>
          </form>
        </div>

        <div className="form-section1">
          <h2>Delete Crop Data</h2>
          <form onSubmit={handleDelete}>
            <div>
              <label>
                Crop Name to Delete:
                <input
                  type="text"
                  value={deleteCname}
                  onChange={(e) => setDeleteCname(e.target.value)}
                />
              </label>
            </div>
            <button className='b1' type="submit">Delete</button>
          </form>
        </div>
        <div>
          <button onClick={() => navigate('Crop_det')} className="display-button1">
            Display Database
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeatherForm;
