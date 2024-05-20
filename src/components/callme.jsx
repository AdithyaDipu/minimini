import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './callme.css'

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

const CallMe = () => {
    const location = useLocation();
    const { cropNames } = location.state || { cropNames: [] };
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Received cropNames:", cropNames); // Debugging line
        const fetchCrops = async () => {
            const db = getFirestore(app);

            if (!Array.isArray(cropNames) || cropNames.length === 0) {
                setError('No crop names provided');
                setLoading(false);
                return;
            }

            const q = query(collection(db, 'crops'), where('cname', 'in', cropNames));

            try {
                const querySnapshot = await getDocs(q);
                const cropData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCrops(cropData);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchCrops();
    }, [cropNames]);

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading crop details...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div className="bg5 min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Crop Descriptions</h1>
            <ul className="space-y-4">
                {crops.length > 0 ? (
                    crops.map((crop, index) => (
                        <li key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-bold mb-2">{crop.cname || crop.error}</h2>
                            {crop.desc && <p className="text-gray-700">{crop.desc}</p>}
                        </li>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-600">No crops listed.</p>
                )}
            </ul>
        </div>
    );
};

export default CallMe;