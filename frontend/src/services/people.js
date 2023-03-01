import axios from "axios";
const baseURL = "/api/people";

const authAxios = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("loggedFamilyAppUser"))?.token
    }`,
  },
});

const getAll = async () => {
  const response = await authAxios.get("");
  return response.data;
};

const create = async (personObject) => {
  const response = await authAxios.post("", personObject);
  return response.data;
};

const remove = async (id) => {
  const response = await authAxios.delete(`/${id}`);
  return response.data;
};

const update = async (id, personObject) => {
  const response = await authAxios.put(`/${id}`, personObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
