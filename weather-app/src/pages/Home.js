import React, { useState, useEffect } from 'react';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';
import Search from '../components/Search';

const Home = () => {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation', error);
        }
      );
    }
  }, [city]);

  return (
    <div className="home">
      <Search setCity={setCity} />
      <p>Current Weather</p>
      <CurrentWeather city={city} coordinates={coordinates} />
      <p>Hourly Forecast</p>
      <HourlyForecast city={city} coordinates={coordinates} />
      <p>Five Day Forecast</p>
      <FiveDayForecast city={city} coordinates={coordinates} />
    </div>
  );
};

export default Home;
