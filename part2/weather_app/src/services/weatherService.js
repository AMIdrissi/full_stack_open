import axios from "axios";

const URL = "https://studies.cs.helsinki.fi/restcountries";

const getAllCountries = () => {
  return axios.get(`${URL}/api/all`).then((response) => response.data);
};

const getCountryData = (country) => {
  return axios
    .get(`${URL}/api/name/${country}`)
    .then((response) => response.data);
};

export default { getAllCountries, getCountryData };
