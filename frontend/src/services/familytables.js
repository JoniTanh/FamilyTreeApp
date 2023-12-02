import axios from "axios";
const baseURL = "/api/familytables";
const familyTableCache = new Map();

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  if (familyTableCache.has("familytables")) {
    return familyTableCache.get("familytables");
  }

  const response = await axios.get(baseURL, { headers: getHeaders() });
  const data = response.data;
  familyTableCache.set("familytables", data);
  return data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const create = async (familytableObject) => {
  const response = await axios.post(baseURL, familytableObject, {
    headers: getHeaders(),
  });
  const createdFamilyTable = response.data;
  if (familyTableCache.has("familytables")) {
    const updatedFamilyTables = familyTableCache
      .get("familytables")
      .concat(createdFamilyTable);
    familyTableCache.set("familytables", updatedFamilyTables);
  }
  return createdFamilyTable;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  if (familyTableCache.has("familytables")) {
    const updatedFamilyTables = familyTableCache
      .get("familytables")
      .filter((familytable) => familytable.id !== id);
    familyTableCache.set("familytables", updatedFamilyTables);
  }
  return response.data;
};

const update = async (id, familytableObject) => {
  const response = await axios.put(`${baseURL}/${id}`, familytableObject, {
    headers: getHeaders(),
  });
  if (familyTableCache.has("familytables")) {
    const updatedFamilyTables = familyTableCache
      .get("familytables")
      .map((familytable) =>
        familytable.id === id ? response.data : familytable
      );
    familyTableCache.set("familytables", updatedFamilyTables);
  }
  return response.data;
};

const familyTableService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

export default familyTableService;
