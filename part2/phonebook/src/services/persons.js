import axios from "axios";

const URL = "http://localhost:3001";

const createPerson = ({ newNameValue, newNumber }) => {
  return axios
    .post(`${URL}/persons`, {
      name: newNameValue,
      number: newNumber,
    })
    .then((response) => response.data);
};

const getAll = () => {
  return axios.get(`${URL}/persons`).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${URL}/persons/${id}`);
};

const updatePerson = (personUpdated) => {
  return axios
    .put(`${URL}/persons/${personUpdated.id}`, personUpdated)
    .then((response) => response.data).catch();
};



export default { createPerson, getAll, deletePerson, updatePerson };
