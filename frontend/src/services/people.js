import axios from "axios";
const baseURL = "/api/people";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (personObject) => {
  const response = await axios.post(baseURL, personObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const update = async (id, personObject) => {
  const response = await axios.put(`${baseURL}/${id}`, personObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
