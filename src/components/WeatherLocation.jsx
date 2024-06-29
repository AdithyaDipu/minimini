import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Temp from '../components/temp'; // Import OtherComponent

const WeatherLocation = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = '7e9a34ac60d302406828fcdc54f05d0d'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
                
                const response = await axios.get(apiUrl);
                
                if (!response.data) {
                    throw new Error('No data returned');
                }

                setWeatherData(response.data);
            } catch (error) {
                setError('Error fetching weather data: ' + error.message);
            }
        };

        fetchWeather();
    }, [latitude, longitude]); // Run effect whenever latitude or longitude changes

    return (
        <div>
            {weatherData ? (
                <div>
                    
                    {/* Pass temperature to OtherComponent */}
                    <Temp temperature={weatherData.main.temp} />
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default WeatherLocation;