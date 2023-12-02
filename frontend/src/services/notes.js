import axios from "axios";

const baseURL = "/api/notes";
const notesCache = new Map();

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAll = async () => {
  if (notesCache.has("notes")) {
    return notesCache.get("notes");
  }

  const response = await axios.get(baseURL, { headers: getHeaders() });
  const data = response.data;
  notesCache.set("notes", data);
  return data;
};

const create = async (noteObject) => {
  const response = await axios.post(baseURL, noteObject, {
    headers: getHeaders(),
  });
  const createdNote = response.data;
  if (notesCache.has("notes")) {
    const updatedNotes = notesCache.get("notes").concat(createdNote);
    notesCache.set("notes", updatedNotes);
  }
  return createdNote;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, {
    headers: getHeaders(),
  });
  if (notesCache.has("notes")) {
    const updatedNotes = notesCache
      .get("notes")
      .filter((note) => note.id !== id);
    notesCache.set("notes", updatedNotes);
  }
  return response.data;
};

const update = async (id, noteObject) => {
  const response = await axios.put(`${baseURL}/${id}`, noteObject, {
    headers: getHeaders(),
  });
  if (notesCache.has("notes")) {
    const updatedNotes = notesCache
      .get("notes")
      .map((note) => (note.id === id ? response.data : note));
    notesCache.set("notes", updatedNotes);
  }
  return response.data;
};

const notesService = {
  getAll,
  create,
  remove,
  update,
};

export default notesService;
