import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import './userproj.css'

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

const UserProjects = () => {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Current user:", currentUser); // Debugging line
        const fetchProjects = async () => {
            if (!currentUser) {
                setError('User not signed in');
                setLoading(false);
                return;
            }

            const db = getFirestore(app);
            const projectsRef = collection(db, 'proj');
            const q = query(projectsRef, where('userEmail', '==', currentUser.email));

            try {
                const querySnapshot = await getDocs(q);
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsList);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        if (currentUser) {
            fetchProjects();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading projects...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-600">Error: {error}</p>;
    }

    return (
        <div className="bg6 min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">My Projects</h1>
            {projects.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:bg-blue-500 hover:text-white hover:shadow-lg transition-all duration-200"
                        >
                            <h2 className="text-xl font-bold mb-2">{project.pname}</h2>
                            <p className="text-gray-700">{project.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProjects;