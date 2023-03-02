import axios from "axios";
const baseURL = "/api/login";

const login = async (credetials) => {
  const response = await axios.post(baseURL, credetials);
  return response.data;
};

export default { login };
