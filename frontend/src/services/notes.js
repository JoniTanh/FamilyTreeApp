import axios from "axios";
const baseURL = "/api/notes";

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  const response = await axios.get(baseURL, { headers: getHeaders() });
  return response.data;
};

const create = async (noteObject) => {
  const response = await axios.post(baseURL, noteObject, {
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

const update = async (id, noteObject) => {
  const response = await axios.put(`${baseURL}/${id}`, noteObject, {
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
