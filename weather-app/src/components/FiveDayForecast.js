import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../api';

const FiveDayForecast = ({ city, coordinates }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (coordinates) {
      fetchForecast(`${coordinates.lat},${coordinates.lon}`).then(response => setForecast(response.data));
    } else if (city) {
      fetchForecast(city).then(response => setForecast(response.data));
    }
  }, [city, coordinates]);

  if (!forecast) return <div>Loading...</div>;

  return (
    <div className="five-day-forecast">
      {forecast.forecast.forecastday.map((day, index) => (
        <div key={index}>
          <p>{day.date}</p>
          <p>Min: {day.day.mintemp_c}°C</p>
          <p>Max: {day.day.maxtemp_c}°C</p>
          <p>{day.day.condition.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
