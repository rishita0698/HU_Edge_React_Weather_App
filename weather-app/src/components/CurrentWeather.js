// src/components/CurrentWeather.js
import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeather_day } from '../api';

const CurrentWeather = ({ city, coordinates, unit, setWeatherIcon }) => {
    const [weather, setWeather] = useState(null);

    const updateWeatherIcon = useCallback((icon) => {
        setWeatherIcon(icon);
    }, [setWeatherIcon]);

    useEffect(() => {
        if (coordinates) {
          fetchWeather_day(`${coordinates.lat},${coordinates.lon}`).then((response) => {
                setWeather(response.data);
                updateWeatherIcon(response.data.current.condition.icon);
            });
        } else if (city) {
          fetchWeather_day(city).then((response) => {
                setWeather(response.data);
                updateWeatherIcon(response.data.current.condition.icon);
            });
        }
    }, [city, coordinates, updateWeatherIcon]);

    if (!weather) return <div>Loading...</div>;

    // const temp = unit === 'C' ? weather.current.temp_c : weather.current.temp_f;
    const maxTemp = unit === 'C' ? weather.forecast.forecastday[0].day.maxtemp_c : weather.forecast.forecastday[0].day.maxtemp_f;
    const minTemp = unit === 'C' ? weather.forecast.forecastday[0].day.mintemp_c : weather.forecast.forecastday[0].day.mintemp_f;

    return (
        <div className="current-weather">
            <h2>{weather.current.condition.text}</h2>
            <div className="weather-details">
                <div className="weather-detail-item">
                    <span>Temp max</span>
                    <span>{maxTemp}°{unit} <img src={weather.current.condition.icon} alt="Temp Icon" /></span>
                </div>
                <div className="weather-detail-item">
                    <span>Temp min</span>
                    <span>{minTemp}°{unit} <img src={weather.current.condition.icon} alt="Temp Icon" /></span>
                </div>
                <div className="weather-detail-item">
                    <span>Humidity</span>
                    <span>{weather.current.humidity}% <i className="fas fa-tint"></i></span>
                </div>
                <div className="weather-detail-item">
                    <span>Cloudy</span>
                    <span>{weather.current.cloud}% <i className="fas fa-cloud"></i></span>
                </div>
                <div className="weather-detail-item">
                    <span>Wind</span>
                    <span>{weather.current.wind_kph} kph <i className="fas fa-wind"></i></span>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
