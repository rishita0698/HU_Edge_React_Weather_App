// src/pages/SearchPage.js

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import Search from '../components/Search';
import { fetchWeather } from '../api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const city = query.get('city');
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [weatherIcon, setWeatherIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');

  const fetchCityNameAndTemperature = useCallback(async (city) => {
    try {
      const weatherResponse = await fetchWeather(city);
      const temp = unit === 'C' ? weatherResponse.current.temp_c : weatherResponse.current.temp_f;
      setTemperature(`${temp}°${unit}`);
      setWeatherIcon(weatherResponse.current.condition.icon);
      setCoordinates({
        lat: weatherResponse.location.lat,
        lon: weatherResponse.location.lon,
      });
      setError('');
    } catch (error) {
      console.error('Error fetching city name and temperature', error);
      setTemperature('');
      setWeatherIcon('');
      setCoordinates(null);
      setError(error.message);
    }
  }, [unit]);

  useEffect(() => {
    if (city) {
      fetchCityNameAndTemperature(city);
    }
  }, [city, fetchCityNameAndTemperature]);

  const handleToggle = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
    if (city) {
      fetchCityNameAndTemperature(city);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <Search setCity={() => {}} />
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

export default SearchPage;
