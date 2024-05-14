import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; // Import initializeApp function from Firebase
import '../components/style.css'
import Navbar from './navbar';


const SearchByTemperature = ({ temperature }) => {
    const [matchingCrops, setMatchingCrops] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [availability, setAvailability] = useState('min'); // Default availability option
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
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

        // Initialize Firebase app
        const app = initializeApp(firebaseConfig);

        const fetchMatchingCrops = async () => {
            try {
                // Get Firestore instance
                const firestore = getFirestore(app);
                // Get the 'crops' collection
                const cropsCollection = collection(firestore, 'crops');
                // Query for crops where temperature falls between mintemp and maxtemp
                const tempQuery = query(cropsCollection, where('mintemp', '<=', temperature), where('maxtemp', '>=', temperature));
                // Get documents that match the query
                const querySnapshot = await getDocs(tempQuery);
                
                // Extract crop names (cname) from the documents
                const crops = querySnapshot.docs.map(doc => doc.data().cname);
                // Set matching crops state
                setMatchingCrops(crops);
                // Clear any previous errors
                setError(null);
            } catch (error) {
                // Set error if there's an issue fetching data
                setError('Error fetching data: ' + error.message);
                // Clear matching crops state
                setMatchingCrops([]);
            }
        };

        // Call the fetchMatchingCrops function
        fetchMatchingCrops();
    }, [temperature]); // Run effect whenever temperature changes

    const addToCart = (crop) => {
        if (!cart.includes(crop)) {
            setCart(prevCart => [...prevCart, crop]);
        }
    };

    const handleAddProject = async () => {
        if (projectName) {
            try {
                const firestore = getFirestore();
                // Assuming you have a way to retrieve the user's email address, let's say from a variable named 'userEmail'
                const userEmail = 'example@example.com';
                await addDoc(collection(firestore, 'proj'), {
                    pname: projectName,
                    userEmail: userEmail, // Store the user's email address along with the project name
                    place: availability,
                    cname: cart
                });
                // Add all crops in the cart to a list named "adithya"
                const adithyaCollectionRef = collection(firestore, 'adithya');
                await Promise.all(cart.map(async crop => {
                    await addDoc(adithyaCollectionRef, {
                        crop: crop,
                        projectName: projectName
                    });
                }));
                alert('Project added successfully!');
                setProjectName('');
                setCart([]);
            } catch (error) {
                setError('Error adding project: ' + error.message);
            }
        } 
    };

    // Filter crops based on selected availability
    const filterCropsByAvailability = () => {
        if (availability === 'min') {
            return matchingCrops.slice(0, 5);
        } else if (availability === 'medium') {
            return matchingCrops.slice(0, 6);
        } else if (availability === 'max') {
            return matchingCrops;
        }
    };


 

    return (
        <>
        <Navbar></Navbar>
        <div className='bggg'>
        <div className="containerr">
            <h2>Crops Suitable for your current climate </h2>
            <div className="availability-select">
                <label htmlFor="availability">Availability of space:</label>
                <select id="availability" onChange={(e) => setAvailability(e.target.value)}>
                    <option value="min">Min</option>
                    <option value="medium">Medium</option>
                    <option value="max">Max</option>
                </select>
            </div>
            <div className="project-details">
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul className="crop-list">
                    {filterCropsByAvailability().map((crop, index) => (
                        <li key={index} className="crop-itemm">
                            <span onClick={() => addToCart(crop)} className="add-icon">+</span> {crop}
                        </li>
                    ))}
                </ul>
            )}
            <div className="cart">
                <h3>Cart</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item}</li>
                        
                       
                    ))}
                </ul>
            </div>
             <button className='bb' onClick={handleAddProject}>Add Project</button>
        </div>
        </div>
        </>
    );
};

export default SearchByTemperature;
