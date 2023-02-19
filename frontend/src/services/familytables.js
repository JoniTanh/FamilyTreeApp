import axios from "axios";
const baseURL = "/api/familytables";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (familytableObject) => {
  const response = await axios.post(baseURL, familytableObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const update = async (id, familytableObject) => {
  const response = await axios.put(`${baseURL}/${id}`, familytableObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
