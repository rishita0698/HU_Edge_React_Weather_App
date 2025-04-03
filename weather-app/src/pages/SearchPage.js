import React from 'react';
import { useLocation } from 'react-router-dom';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import FiveDayForecast from '../components/FiveDayForecast';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const city = query.get('city');

  return (
    <div className="search-page">
      <p1>Current Weather</p1>
      <CurrentWeather city={city} />
      <p>Hourly Forecast</p>
      <HourlyForecast city={city} />
      <p>Five Day Forecast</p>
      <FiveDayForecast city={city} />
    </div>
  );
};

export default SearchPage;
