import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const useCropsData = (cropNames) => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    return { crops, loading, error };
};

export default useCropsData;
