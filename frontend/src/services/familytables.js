import axios from "axios";
const baseURL = "/api/familytables";

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

const create = async (familytableObject) => {
  const response = await authAxios.post("/", familytableObject);
  return response.data;
};

const remove = async (id) => {
  const response = await authAxios.delete(`$/${id}`);
  return response.data;
};

const update = async (id, familytableObject) => {
  const response = await authAxios.put(`/${id}`, familytableObject);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
  update,
};
