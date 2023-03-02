import axios from "axios";
const baseURL = "/api/people";

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  const response = await axios.get(baseURL, { headers: getHeaders() });
  return response.data;
};

const create = async (personObject) => {
  const response = await axios.post(baseURL, personObject, {
    headers: getHeaders(),
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const update = async (id, personObject) => {
  const response = await axios.put(`${baseURL}/${id}`, personObject, {
    headers: getHeaders(),
  });
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
