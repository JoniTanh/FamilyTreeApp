import axios from "axios";
const baseURL = "/api/notes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (noteObject) => {
  const response = await axios.post(baseURL, noteObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const update = async (id, noteObject) => {
  const response = await axios.put(`${baseURL}/${id}`, noteObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
