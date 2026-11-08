import axios from "axios";

const URL = "https://studies.cs.helsinki.fi/restcountries";
const WEATHER_API_KEY = import.meta.env.API_KEY;

const getAllCountries = () => {
  return axios.get(`${URL}/api/all`).then((response) => response.data);
};

const getCountryData = (country) => {
  return axios
    .get(`${URL}/api/name/${country}`)
    .then((response) => response.data);
};

const getWeatherInfo = ({ lat, lon }) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${WEATHER_API_KEY}`,
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export default { getAllCountries, getCountryData, getWeatherInfo };
