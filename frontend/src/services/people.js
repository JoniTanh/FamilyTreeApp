import axios from "axios";
const baseURL = "/api/people";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseURL, newObject);
  return response.data;
};

export default {
  getAll,
  create,
};
