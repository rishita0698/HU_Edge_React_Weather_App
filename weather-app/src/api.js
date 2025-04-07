// src/api/index.js

import axios from 'axios';

const API_KEY = 'fcf149ef20f1484ab4f172906250304'; // Replace with your API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('City not found');
    } else {
      throw new Error('Error fetching weather data');
    }
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('City not found');
    } else {
      throw new Error('Error fetching forecast data');
    }
  }
};

export const fetchWeather_day = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=1`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('City/Location not found');
    } else {
      throw new Error('Error fetching weather data');
    }
  }
};
