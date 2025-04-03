import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../api';

const CurrentWeather = ({ city, coordinates }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (coordinates) {
      fetchWeather(`${coordinates.lat},${coordinates.lon}`).then(response => setWeather(response.data));
    } else if (city) {
      fetchWeather(city).then(response => setWeather(response.data));
    }
  }, [city, coordinates]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="current-weather">
      <h2>{weather.location.name}</h2>
      <p>{weather.current.temp_c}°C</p>
      <p>{weather.current.condition.text}</p>
    </div>
  );
};

export default CurrentWeather;
