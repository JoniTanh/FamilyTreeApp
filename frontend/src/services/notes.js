import axios from "axios";
const baseURL = "/api/notes";

const authAxios = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("loggedFamilyAppUser"))?.token
    }`,
  },
});

const getAll = async () => {
  const response = await authAxios.get("/");
  return response.data;
};

const create = async (noteObject) => {
  const response = await authAxios.post("/", noteObject);
  return response.data;
};

const remove = async (id) => {
  const response = await authAxios.delete(`/${id}`);
  return response.data;
};

const update = async (id, noteObject) => {
  const response = await authAxios.put(`/${id}`, noteObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
