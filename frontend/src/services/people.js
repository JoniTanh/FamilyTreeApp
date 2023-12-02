import axios from "axios";
const baseURL = "/api/people";
const peopleCache = new Map();

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  if (peopleCache.has("people")) {
    return peopleCache.get("people");
  }

  const response = await axios.get(baseURL, { headers: getHeaders() });
  const data = response.data;
  peopleCache.set("people", data);
  return data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const create = async (personObject) => {
  const response = await axios.post(baseURL, personObject, {
    headers: getHeaders(),
  });
  const createdPerson = response.data;
  if (peopleCache.has("people")) {
    const updatedPeople = peopleCache.get("people").concat(createdPerson);
    peopleCache.set("people", updatedPeople);
  }
  return createdPerson;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  if (peopleCache.has("people")) {
    const updatedPeople = peopleCache
      .get("people")
      .filter((person) => person.id !== id);
    peopleCache.set("people", updatedPeople);
  }
  return response.data;
};

const update = async (id, personObject) => {
  const response = await axios.put(`${baseURL}/${id}`, personObject, {
    headers: getHeaders(),
  });
  if (peopleCache.has("people")) {
    const updatedPeople = peopleCache
      .get("people")
      .map((person) => (person.id === id ? response.data : person));
    peopleCache.set("people", updatedPeople);
  }
  return response.data;
};

const peopleService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

export default peopleService;
