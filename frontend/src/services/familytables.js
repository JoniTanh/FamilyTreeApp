import axios from "axios";
const baseURL = "/api/familytables";

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  const response = await axios.get(baseURL, { headers: getHeaders() });
  return response.data;
};

const create = async (familytableObject) => {
  const response = await axios.post(baseURL, familytableObject, {
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

const update = async (id, familytableObject) => {
  const response = await axios.put(`${baseURL}/${id}`, familytableObject, {
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
