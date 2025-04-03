import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../api';

const HourlyForecast = ({ city, coordinates }) => {
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
    <div className="hourly-forecast">
      {forecast.forecast.forecastday[0].hour.map((hour, index) => (
        <div key={index}>
          <p>{hour.time}</p>
          <p>{hour.temp_c}°C</p>
          <p>{hour.condition.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
