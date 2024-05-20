import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, 'proj', projectId);

            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const projectData = docSnap.data();
                    const cropNames = projectData.cname || [];
                    console.log("Navigating with cropNames:", cropNames); // Debugging line
                    navigate('/callme', { state: { cropNames } });
                } else {
                    setError('No such project!');
                }
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchProject();
    }, [projectId, navigate]);

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return null; // Since we navigate away immediately, no need to render anything
};

export default ProjectDetails;