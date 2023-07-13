import axios from "axios";

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const loginUser = async (email, password) => {
  try {
    const res = await productsApi.post("/api/users/login", { email, password });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
