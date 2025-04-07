// src/components/FiveDayForecast.js

import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../api';

const FiveDayForecast = ({ city, coordinates, unit }) => {
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
    <div className="five-day-forecast">
      <table className="weather-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Min Temp</th>
            <th>Max Temp</th>
            <th>Condition</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {forecast.forecast.forecastday.map((day, index) => (
            <tr key={index}>
              <td>{day.date}</td>
              <td>{unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f}°{unit}</td>
              <td>{unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f}°{unit}</td>
              <td>{day.day.condition.text}</td>
              <td><img src={day.day.condition.icon} alt="Weather Icon" className="weather-icon" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FiveDayForecast;
