// src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import Search from '../components/Search';
import { fetchWeather_day } from '../api';

const Home = () => {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [weatherIcon, setWeatherIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');

  const fetchCityNameAndTemperature = useCallback(async (coords, newUnit = unit) => {
    try {
      const weatherResponse = await fetchWeather_day(`${coords.lat},${coords.lon}`);
      const cityName = weatherResponse.location.name;
      setCity(cityName);
      const temp = newUnit === 'C' ? weatherResponse.current.temp_c : weatherResponse.current.temp_f;
      setTemperature(`${temp}°${newUnit}`);
      setWeatherIcon(weatherResponse.current.condition.icon);
      setError('');
    } catch (error) {
      console.error('Error fetching city name and temperature', error);
      setCity('');
      setTemperature('');
      setWeatherIcon('');
      setError(error.message);
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
          setError('Error getting geolocation');
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
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <div className="right-panel">
        <div className="toggle-container">
          <label>Switch to Fahrenheit</label>
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
