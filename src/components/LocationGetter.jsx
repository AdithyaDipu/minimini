import React, { useState, useEffect } from 'react';
import WeatherLocation from '../components/WeatherLocation.jsx'; // Import OtherComponent
import '../components/LocationGetter.css'; // Import CSS file

const LocationGetter = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (!navigator.geolocation) {
                setError('Geolocation is not supported by your browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    // Store latitude and longitude values
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    setError('Error getting location: ' + error.message);
                }
            );
        };

        getLocation();
    }, []);
    
    return (
        <div className="LocationGetterContainer">
            {location ? (
                <div>
                    {/* Pass latitude and longitude to OtherComponent */}
                    <WeatherLocation latitude={latitude} longitude={longitude} />
                </div>
            ) : (
                <p className="LocationGetterLoading">Loading location...</p>
            )}
            {error && <p className="LocationGetterError">{error}</p>}
        </div>
    );
};

export default LocationGetter;