import axios from "axios";


const API_URL = `${process.env.REACT_APP_API_HOST}/api/auth/`;

const create = data => {
  return axios.post(API_URL + "ajouter", data);
};

const update = (id, data) => {
  return  axios.put(API_URL + `societe/update/${id}`, data);
};
/*
const getAll = () => {
  return http.get("/tutorials");
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};


const update = (id, data) => {
  return  axios.put(API_URL + `/societe/update/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};
const removeAll = () => {
  return axios.delete(`/tutorials`);
};

*/

const findByTitle = siret => {
  return axios.get(`/Societes?siret=${siret}`);
};

const AuthSociete = {

  create,
  findByTitle,
  update
};

export default AuthSociete;
