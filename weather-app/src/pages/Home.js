// src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import Search from '../components/Search';
import axios from 'axios';

const Home = () => {
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
    const [weatherIcon, setWeatherIcon] = useState('');
    const [temperature, setTemperature] = useState('');

    const fetchCityNameAndTemperature = useCallback(async (coords, newUnit = unit) => {
        try {
            const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=fcf149ef20f1484ab4f172906250304&q=${coords.lat},${coords.lon}&days=1`);
            const cityName = weatherResponse.data.location.name;
            setCity(cityName);
            const temp = newUnit === 'C' ? weatherResponse.data.current.temp_c : weatherResponse.data.current.temp_f;
            setTemperature(`${temp}°${newUnit}`);
            setWeatherIcon(weatherResponse.data.current.condition.icon);
        } catch (error) {
            console.error('Error fetching city name and temperature', error);
            setCity('Your Location');
            setTemperature('');
        }
    }, [unit]);

    useEffect(() => {
        if (!city) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    };
                    setCoordinates(coords);
                    fetchCityNameAndTemperature(coords);
                },
                (error) => {
                    console.error('Error getting geolocation', error);
                }
            );
        }
    }, [city, fetchCityNameAndTemperature]);

    const handleToggle = () => {
        const newUnit = unit === 'C' ? 'F' : 'C';
        setUnit(newUnit);
        if (coordinates) {
            fetchCityNameAndTemperature(coordinates, newUnit);
        }
    };

    return (
        <div className="container">
            <div className="left-panel">
                <Search setCity={setCity} />
                <div className="city-info">
                    <h2>{city}</h2>
                    <p>{new Date().toLocaleDateString()}</p>
                    {weatherIcon && <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />}
                    <p className="temperature">{temperature}</p>
                </div>
            </div>
            <div className="right-panel">
                <div className="toggle-container">
                    <label>Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}</label>
                    <label className="toggle-switch">
                        <input type="checkbox" checked={unit === 'F'} onChange={handleToggle} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="weather-section">
                    <h2>Current Weather Details</h2>
                    <CurrentWeather city={city} coordinates={coordinates} unit={unit} setWeatherIcon={setWeatherIcon} />
                </div>
                <div className="weather-section">
                    <h2>Hourly Forecast</h2>
                    <HourlyForecast city={city} coordinates={coordinates} unit={unit} />
                </div>
                <div className="weather-section">
                    <h2>Five Day Forecast</h2>
                    <FiveDayForecast city={city} coordinates={coordinates} unit={unit} />
                </div>
            </div>
        </div>
    );
};

export default Home;
