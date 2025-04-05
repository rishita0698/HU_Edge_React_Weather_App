import axios from 'axios';

const API_KEY = 'fcf149ef20f1484ab4f172906250304'; // Replace with your API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = (city) => {
  return axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
};

export const fetchForecast = (city) => {
  return axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5`);
};


export const fetchWeather_day = async (location) => {
  const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=fcf149ef20f1484ab4f172906250304&q=${location}&days=1`);
  return response;
};