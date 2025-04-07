// src/components/HourlyForecast.js

import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../api';

const HourlyForecast = ({ city, coordinates, unit }) => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        let response;
        if (coordinates) {
          response = await fetchForecast(`${coordinates.lat},${coordinates.lon}`);
        } else if (city) {
          response = await fetchForecast(city);
        }
        setForecast(response);
        setError('');
      } catch (error) {
        console.error('Error fetching forecast data', error);
        setError(error.message);
      }
    };

    fetchForecastData();
  }, [city, coordinates]);

  if (error) return <div className="error">{error}</div>;
  if (!forecast) return <div>Loading...</div>;

  return (
    <div className="hourly-forecast">
      <table className="weather-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Condition</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {forecast.forecast.forecastday[0].hour.map((hour, index) => (
            <tr key={index}>
              <td>{hour.time}</td>
              <td>{unit === 'C' ? hour.temp_c : hour.temp_f}°{unit}</td>
              <td>{hour.condition.text}</td>
              <td><img src={hour.condition.icon} alt="Weather Icon" className="weather-icon" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HourlyForecast;
