import axios from "axios";

const productsApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getProducts = async (path) => {
  const res = await productsApi.get(path);
  return res.data;
  console.log(path);
};

export const getProductsCategory = async (path) => {
  const res = await productsApi.get(path);
  return res.data;
  console.log(path);
};

export const getProudct = async (id) => {
  if (id === undefined) {
    return null;
  }

  const res = await productsApi.get(`api/products/${id}`);
  return res.data;
};
